import { PainterFactory } from './painter.factory';
import { castles } from './ui-elements.store';


export class PathUi {
    constructor({path}) {
        this.path = path;
        this.castleUi1 = castles.find(path.castle1);
        this.castleUi2 = castles.find(path.castle2);
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

    get id () {
        return this.path.id;
    }

    render () {
        this.graphics.color1 = this.castleUi1.color;
        this.graphics.color2 = this.castleUi2.color;
        this.graphics.draw();
    }
}
