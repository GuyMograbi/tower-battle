import { PainterFactory } from './painter.factory';
import { Colors } from './renderer';


export class PathUi {
    constructor({castleUi1, castleUi2}) {
        this.castleUi1 = castleUi1;
        this.castleUi2 = castleUi2;
        this.graphics = PainterFactory.createLine({
                location1: this.castleUi1.location,
                location2: this.castleUi2.location,
                color1: this.castleUi1.color,
                color2: this.castleUi2.color,
                width: 10,
        });

        this.graphics.onClick = () => {
            console.log("clicked!!")
        }
    }

    render () {
        this.graphics.color1 = this.castleUi1.color;
        this.graphics.color2 = this.castleUi2.color;
        this.graphics.draw();
    }
}
