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

class Line {
    constructor({x1, y1, x2, y2, color1, color2, width}) {
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
        this._width = width;
        this._color1 = color1;
        this._color2 = color2;
        this.drawn = false;

        this.graphics = new PIXI.Graphics();
        this.graphics.interactive = true;
        this.graphics.buttonMode = true;
        this.graphics.on('pointerdown', () => console.log('test'));
        console.log('adding interactive test');
    }

    set color1 (color1) {
        this._color1 = color1;
    }

    set color2 (color2) {
        this._color2 = color2;
    }

    set onClick (func) {
        // this.graphics.interactive = true;
        // this.graphics.buttonMode = true;
        // this.graphics.on('pointerdown', func);
    }

    // m = y2 - y1 / x2 - x1
    get angle () {
        const epsilon = 0.01;
        const dy = Math.abs(this._y2 - this._y1) < epsilon ? epsilon : this._y2 - this._y1;
        const dx = Math.abs(this._x2 - this._x1) < epsilon ? epsilon : this._x2 - this._x1;
        return dy / dx;
    }

    get perpendicularAngle () {
        return - 1 / this.angle;
    }

    // y -mx = b
    get constant1 () {
        return (this._y1 - this.perpendicularAngle * this._x1);
    }

    get constant2 () {
        return (this._y2 - this.perpendicularAngle * this._x2);
    }

    // https://math.stackexchange.com/questions/175896/finding-a-point-along-a-line-a-certain-distance-away-from-another-point
    getPointInDistanceD([x0, y0], [x1, y1], distance) {
        const v = [x1-x0, y1 - y0];
        const vLength = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
        const unitV = [v[0] / vLength, v[1] / vLength];

        return [x0 + distance * unitV[0], y0 + distance * unitV[1]];
    }

    getPerpendicularVertices([x0, y0], angle, constant, distance) {
        const x1 = x0 + distance;
        const y1 = angle * x1 + constant;

        const v0 /* [x,y] */ = this.getPointInDistanceD([x0, y0], [x1, y1], distance);
        const v1 = this.getPointInDistanceD([x0, y0], [x1, y1], -distance);
        this.assertDistanceBetweenPoints(v0, v1, 2*distance);
        return [v0, v1];

    }

    assertDistanceBetweenPoints ([x0, y0], [x1, y1], expectedDistance) {
        const distance = Math.sqrt(Math.pow(x1-x0, 2) + Math.pow(y1 - y0, 2));
        if (Math.abs(distance - expectedDistance) > 0.01 ) {
            debugger;
        }
    }

    get midpoint () {
        return [(this._x1 + this._x2)/2, (this._y1 + this._y2)/2];
    }

    get midpointConstant () {
        const v = this.midpoint;
        return (v[1] - this.perpendicularAngle * v[0]);
    }

    drawPolygon (p1, p2, constant1, constant2, color) {
        this.graphics.beginFill(color, 0.3);

        // this.graphics.drawPolygon({x: this._x1 - 5, y: this._y1}, {x: this._x1 + 5, y: this._y1}, {x: this._x2 + 5, y: this._y2}, {x: this._x2 - 5, y: this._y2});
        // this.graphics.drawPolygon( 10, 10, 120, 100, 120, 200, 70, 200);
        // this.graphics.drawPolygon(this._x1, this.angle * 5,  this._x2 - this.angle *  5, this._y2 - this.angle * 5,  this._x2 + this.angle * 5,  this._y2 + this.angle * 5, this._x1 + this.angle * 5,  this._y1 - this.angle * 5);

        // console.log(this._x1, this._y1, this._x2, this._y2);
        // if (this._x2 === 1000 && this._y2 === 100) {
        //     debugger;
        // }
        const dx = 6;
        const [v0, v1] = this.getPerpendicularVertices(p1, this.perpendicularAngle, constant1, dx);
        const [v2, v3] = this.getPerpendicularVertices(p2, this.perpendicularAngle, constant2, dx);
        const vertices = [ ...v0, ...v1, ...v3, ...v2];
        // 1 - x, y
        //     this._x1 + dx, this.perpendicularAngle * (this._x1) + this.constant1 + dx,
        //     // 2 - x, y
        //     this._x2 + dx,  this.perpendicularAngle * (this._x2) + this.constant2 + dx,
        //     // 3 - x,y
        //     this._x2 - dx,  this.perpendicularAngle * (this._x2) + this.constant2 + dx,
        //     // 4 - x,y
        //     this._x1 - dx, this.perpendicularAngle * (this._x1) + this.constant1 + dx,
        // ];

        this.graphics.drawPolygon(
            ...vertices

        );
        // this.graphics.drawRect(this._x1, this._y1,  this._x2 - this._x1, this._y2 - this._y1);

    }

    draw () {
        // if (this.drawn) {
        //     return;
        // }
        // console.log('drawing');
        this.graphics.clear();
        // this.graphics.beginFill(0xcecece, 0.3);

        this.drawPolygon([this._x1, this._y1], this.midpoint, this.constant1, this.midpointConstant, ColorToHex[this._color1] ?? 0xcecece);
        this.drawPolygon( this.midpoint, [this._x2, this._y2], this.midpointConstant, this.constant2, ColorToHex[this._color2] ?? 0xcecece);
        this.graphics.endFill();

        // this.graphics.drawPolygon({x: this._x1 - 5, y: this._y1}, {x: this._x1 + 5, y: this._y1}, {x: this._x2 + 5, y: this._y2}, {x: this._x2 - 5, y: this._y2});
        // this.graphics.drawPolygon( 10, 10, 120, 100, 120, 200, 70, 200);
        // this.graphics.drawPolygon(this._x1, this.angle * 5,  this._x2 - this.angle *  5, this._y2 - this.angle * 5,  this._x2 + this.angle * 5,  this._y2 + this.angle * 5, this._x1 + this.angle * 5,  this._y1 - this.angle * 5);

        console.log(this._x1, this._y1, this._x2, this._y2);
        if (this._x2 === 1000 && this._y2 === 100) {
            debugger;
        }
        const dx = 6;
        const [v0, v1] = this.getPerpendicularVertices([this._x1, this._y1], this.perpendicularAngle, this.constant1, dx);
        const [v2, v3] = this.getPerpendicularVertices([this._x2, this._y2], this.perpendicularAngle, this.constant2, dx);
        const vertices = [ ...v0, ...v1, ...v3, ...v2];
            // 1 - x, y
        //     this._x1 + dx, this.perpendicularAngle * (this._x1) + this.constant1 + dx,
        //     // 2 - x, y
        //     this._x2 + dx,  this.perpendicularAngle * (this._x2) + this.constant2 + dx,
        //     // 3 - x,y
        //     this._x2 - dx,  this.perpendicularAngle * (this._x2) + this.constant2 + dx,
        //     // 4 - x,y
        //     this._x1 - dx, this.perpendicularAngle * (this._x1) + this.constant1 + dx,
        // ];

        this.graphics.drawPolygon(
            ...vertices

        );
        // this.graphics.drawRect(this._x1, this._y1,  this._x2 - this._x1, this._y2 - this._y1);
        this.graphics.endFill();

            // this.graphics.moveTo(this._x1, this._y1);
            // this.graphics.lineStyle({
            //     width: this._width,
            //     alpha: 0.3,
            //     color: ColorToHex[this._color1] ?? 0xcecece,
            // })
            // this.graphics.lineTo((this._x1 + this._x2)/2, (this._y1 + this._y2)/2);
            // this.graphics.lineStyle({
            //     width: this._width,
            //     alpha: 0.3,
            //     color: ColorToHex[this._color2] ?? 0xcecece,
            // });
            // this.graphics.lineTo(this._x2, this._y2);
            // // this.graphics.lineTo(this._x2 + 100, this._y2 + 100);
            // this.graphics.endFill();
        // this.graphics.drawPolygon(this._x1 - 5, this._y1 + 5,  this._x2 - 5, this._y2 + 5,  this._x2 + 5,  this._y2 - 5, this._x1 + 5,  this._y1 - 5);
        // debugger;
        // this.graphics.shape.closed = false;
        // this.drawn = true;
    }

    get element () {
        return this.graphics;
    }
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
    Circle,
    Line,
}
