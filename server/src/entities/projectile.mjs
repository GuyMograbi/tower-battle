/**
 * Every tower can shoot a projectile.
 * Each projectile takes away strength from the tower.
 *
 * If the projectile hits an enemy tower - it will damage it in the amount of its power.
 * If the projection hits a friendly tower - it will add to that tower's power the same amount it carries.
 * If the projectile hits an enemy projectile - it will lose from its power.
 *
 * Projectiles continuously move until they reach their destination or hit by an enemy projectile.
 */

import { gsap } from 'gsap';
import { v4 as uuidv4 } from 'uuid';
import { Location } from '../types/location.mjs';

export class Projectile {
    constructor({power, fromCastle, toCastle}) {
        this.power = power;
        this.fromCastle = fromCastle;
        this.toCastle = toCastle;
        this.locationData = {x: fromCastle.location.x, y: fromCastle.location.y};
        this._exists = true;
        this._id = uuidv4();
    }

    get id () {
        return this._id;
    }

    get exists () {
        return this._exists;
    }

    onHit(onHitFunction) {
        this._onHit = onHitFunction;
    }

    startMoving () {
        gsap.to(this.locationData, {
            ease: 'none',
            duration: 3,
            x: this.toCastle.location.x,
            y:this.toCastle.location.y,
            onComplete: () => {
                this._onHit();
                this._exists = false;
            },
        });
    }


    get location () {
        return new Location(this.locationData.x, this.locationData.y);
    }

    toJSON () {
        return {
            id: this.id,
            location: this.location,
            power: this.power,
            exists: this.exists,
            fromCastle: {id: this.fromCastle.id},
            toCastle: {id: this.toCastle.id},
        };
    }
}
