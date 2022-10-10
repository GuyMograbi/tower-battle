import { PainterFactory } from './painter.factory';
import { Colors } from './renderer';
import { players } from './ui-elements.store';


export class CastleUi {
    /**
     *
     * @param {Castle} castle
     * @param {PlayerUi} ownerKing
     */
    constructor(castle) {
        this._castle = castle;
        this.graphics = PainterFactory.createCircle({
            location: {
                x: this._castle.location.x,
                y: this._castle.location.y,
            },
            radius: this._castle.strength,
            color: this.color,
        });
    }

    get castle () {
        return this._castle;
    }

    get location () {
        return this.castle.location;
    }

    get id () {
        return this.castle.id;
    }

    get color () {
        return this.castle.ownerKing ?
            players.find({id: this.castle.ownerKing.id}).color :
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
        this.graphics.color = this.color;
        this.graphics.radius = this.castle.strength;
        this.graphics.draw();
    }
}
