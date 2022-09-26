import { v4 as uuidv4 } from 'uuid';

export class Player {
    constructor (name) {
        this._name = name;
        this._id = uuidv4();
    }

    get id () {
        return this._id;
    }

    get name () {
        return this._name;
    }
}
