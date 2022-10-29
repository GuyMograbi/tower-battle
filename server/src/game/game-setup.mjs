import { Store } from '../stores.mjs'
import {Castle, Path, Player, Projectile} from "../entities/index.mjs";
import {Location} from "../types/index.mjs";

// TODO: generate random locations
const locations = [
    [100,100],
    [600,100],
    [200, 600],
    [500,450],
    [600, 300],
    [100, 400],
    [500, 700],
    [900, 300],
    [1000, 100],
    [1000, 600],
];


class GameSetup {
    constructor ({
        numberOfCastles,
        numberOfPlayers,
    }) {
        this.numberOfCastles = numberOfCastles;
        this.numberOfPlayers = numberOfPlayers;
        this.castles = new Store();
        this.players = new Store();
        this.projectiles = new Store();
        this.paths = new Store();
    }

    pathBetween(castle1, castle2) {
        return new Path({
            castle1: castle1,
            castle2: castle2,
        });
    }


    setupCastles () {
        const result = [];
        for (let i = 0; i< this.numberOfCastles; i++) {
            const location = locations[i];

            const castle = new Castle(new Location(...location));

            // castle.strength = 10;
            result.push(castle);

            if (i < this.numberOfPlayers) {
                const player = new Player('demo', 'demo');
                castle.ownerKing = player;
                this.players.add(player);
            }
            this.castles.add(castle);
        }
        return result;
    }

// {Castle} (not CastleUi)
    setupPaths () {
        const castlesArr = this.castles.all();
        const result = [
            this.pathBetween(castlesArr[0], castlesArr[1]),
            this.pathBetween(castlesArr[0], castlesArr[2]),
            this.pathBetween(castlesArr[1], castlesArr[3]),
            this.pathBetween(castlesArr[1], castlesArr[4]),
            this.pathBetween(castlesArr[2], castlesArr[3]),
            this.pathBetween(castlesArr[2], castlesArr[6]),
            this.pathBetween(castlesArr[0], castlesArr[5]),
            this.pathBetween(castlesArr[5], castlesArr[4]),
            this.pathBetween(castlesArr[3], castlesArr[4]),
            this.pathBetween(castlesArr[3], castlesArr[6]),
            this.pathBetween(castlesArr[5], castlesArr[6]),
            this.pathBetween(castlesArr[6], castlesArr[7]),
            this.pathBetween(castlesArr[7], castlesArr[8]),
            this.pathBetween(castlesArr[8], castlesArr[9]),
            this.pathBetween(castlesArr[9], castlesArr[7]),
            this.pathBetween(castlesArr[7], castlesArr[4]),
            this.pathBetween(castlesArr[8], castlesArr[1]),
            this.pathBetween(castlesArr[6], castlesArr[9]),
        ];

        for (const path of result) {
            this.paths.add(path);
        }

        return result;
    }

    setupGame () {
        this.setupCastles();
        this.setupPaths();
    }

    toJSON() {
        return {
            projectiles: this.projectiles,
            castles: this.castles,
            players: this.players,
            paths: this.paths,
        }
    }
}

export {
    GameSetup,
}
