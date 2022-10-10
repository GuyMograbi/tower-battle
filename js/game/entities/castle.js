import { v4 as uuidv4 } from 'uuid';

export class Castle {
    constructor (location) {
        this._id = uuidv4();
        this._location = location;
        this._strength = 30;
    }
    set strength (strength) {
        this._strength = strength;
    }

    get location () {
        return this._location;
    }

    get strength () {
        return this._strength;
    }

    set ownerKing (ownerKing) {
        debugger;
        this._ownerKing = ownerKing;
        this._strength = 10;
    }

    get id () {
        return this._id;
    }

    get ownerKing () {
        return this._ownerKing;
    }

    hit (strength, shooterKing) {
        if (strength >= this.strength) {
            this.ownerKing = shooterKing;
        }
    }


}
