export class Location {
    constructor (x, y) {
        this._x = x;
        this._y = y;
    }

    get x () {
        return this._x;
    }

    get y () {
        return this._y;
    }

    distanceFrom(otherLocation) {
        return Math.sqrt(Math.pow(otherLocation.x - this.x, 2) + Math.pow(otherLocation.y - this.y, 2))
    }
}
