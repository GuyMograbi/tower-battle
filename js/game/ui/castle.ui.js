import { PainterFactory } from './painter.factory';
import { Colors } from './renderer';


export class CastleUi {
    /**
     *
     * @param {Castle} castle
     * @param {PlayerUi} ownerKing
     */
    constructor(castle, ownerKing) {
        this.castle = castle;
        this._ownerKing = ownerKing;
        this.graphics = PainterFactory.createCircle({
            location: {
                x: this.castle.location.x,
                y: this.castle.location.y,
            },
            radius: this.castle.strength,
            color: this.color,
        });
    }

    get location () {
        return this.castle.location;
    }

    get id () {
        return this.castle.id;
    }

    get color () {
        return this._ownerKing ?
            this._ownerKing.color :
            Colors.GRAY;
    }

    set ownerKing (playerUi) {
        this._ownerKing = playerUi;
        this.graphics.color = this._ownerKing.color;
    }

    // deprecated
    set playerUi (playerUi) {
        this.ownerKing = playerUi;
    }

    isOwned () {
        return this._ownerKing;
    }

    render () {
        this.graphics.radius = this.isOwned() ? this.castle.strength : 30;
        this.graphics.draw();
    }
}
