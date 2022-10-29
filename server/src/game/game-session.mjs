import { v4 as uuidv4 } from 'uuid';
import { GameSetup } from './game-setup.mjs'
import {gameSessions} from "../stores.mjs";
import {Projectile} from "../entities/projectile.mjs";

export class GameSession {
    constructor ({
        numberOfCastles,
        numberOfPlayers,
    }) {
        this._id = uuidv4();
        this.setup = new GameSetup({
            numberOfCastles,
            numberOfPlayers,
        });
        this.setup.setupGame()
    }

    get id () {
        return this._id;
    }

    start () {
        setInterval(() => {
                this.play();
        }, 1000);
    }

    play () {
        this.addStrengthToCastles();
    }

    addStrengthToCastle(castle, strengthToAdd = 1) {
        castle.strength = Math.min(castle.strength + strengthToAdd, 50);
    }

    addStrengthToCastles () {
        for (const castle of this.setup.castles.all()) {
            if (castle.ownerKing) {
                const STRENGTH_TO_ADD = 1;
                this.addStrengthToCastle(castle, STRENGTH_TO_ADD);
            }
        }
    }

    hit ({projectile, castle}) {
        console.log(projectile.id, 'just hit', castle.id);
        if (projectile.fromCastle.ownerKing.id === projectile.toCastle.ownerKing?.id) {
            console.log(projectile.toCastle.id, 'gets more strength', projectile.power - 10)
            this.addStrengthToCastle(projectile.toCastle, projectile.power - 10);
        } else if (projectile.power >= castle.strength) {
            console.log(castle.id, 'changed owner to', projectile.fromCastle.ownerKing);
            castle.ownerKing = projectile.fromCastle.ownerKing;
        } else {
            console.log(castle.id, 'lost strength');
            castle.strength = (castle.strength - projectile.power) + 10;
        }
    }

    shoot({
        originCastle,
        targetCastle,
    }) {
        // TODO: get rid of hard coded power values.
        let projectilePower = Math.floor((originCastle.strength - 10) / 2);
        if (!projectilePower) {
            return;
        }
        console.log('firing projectile with power', projectilePower, 'from castle with strength', originCastle.strength);
        originCastle.strength = originCastle.strength - projectilePower;
        const projectile = new Projectile({
            power: 10 + projectilePower,
            fromCastle: originCastle,
            toCastle: targetCastle,
        });
        projectile.onHit(() => {
            this.hit({projectile, castle: targetCastle});
        })
        projectile.startMoving();
        return projectile;
    }

    toJSON() {
        return {
            id: this.id,
            ...this.setup
        }
    }
}
