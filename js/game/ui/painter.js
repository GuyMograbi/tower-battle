import * as PIXI from 'pixi.js';
import { Colors } from './renderer';

const ColorToHex = {

    [Colors.BLUE]: '0x79a5ff',
    [Colors.PINK]: '0xe8a5ff',
    [Colors.ORANGE]: '0xe89353',
    [Colors.GRAY]: '0xa1a1a0',
    [Colors.YELLOW]: '0xf0e44d',
    [Colors.GREEN]: '0xa1e4a0',
    [Colors.PURPLE]: '0xa15ba0',
}

class Circle {
    constructor({location, radius, color}) {
        this._location = location;
        this._radius = radius;
        this._color = color;


        // const shape = new PIXI.Graphics();
        // shape.beginFill(0xff0000);
        // shape.drawCircle(0,0, radius);
        // shape.endFill();
        // const texture = app.renderer.generateTexture(shape);
        // this.graphics = new PIXI.Sprite(texture);
        // this.graphics.position.x = location.x;
        // this.graphics.position.y = location.y;
        // this.graphics.width = radius;
        // this.graphics.height = radius;

        this.graphics = new PIXI.Graphics();
    }

    set color (color) {
        this._color = color;
    }

    set radius (radius) {
        // this.graphics.width = radius;
        // this.graphics.height = radius;
        this._radius = radius;
    }

    draw () {
        this.graphics.clear();
        // this.graphics.beginFill('0x');
        this.graphics.beginFill(ColorToHex[this._color]);
        this.graphics.drawCircle(this._location.x, this._location.y, this._radius);
        this.graphics.endFill();
    }

    get element () {
        return this.graphics;
    }
}


export {
    Circle
}
