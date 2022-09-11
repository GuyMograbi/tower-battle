import { PainterFactory } from './painter.factory';
import { Colors } from './renderer';


export class CastleUi {
    constructor(castle, playerUi) {
        this.castle = castle;
        this._playerUi = playerUi;
        this.graphics = PainterFactory.createCircle({
            location: {
                x: this.castle.location.x,
                y: this.castle.location.y,
            },
            radius: this.castle.strength,
            color: this.color,
        });
    }

    get color () {
        return this.playerUi ?
            this.playerUi.color :
            Colors.GRAY;
    }

    set playerUi (playerUi) {
        this._playerUi = playerUi;
        this.graphics.color = this._playerUi.color;
    }

    render () {
        this.graphics.radius = this._playerUi ? this.castle.strength : 30;
        this.graphics.draw();
    }
}
