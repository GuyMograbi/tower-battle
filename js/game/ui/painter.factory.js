import {
    Circle,
    Line,
} from './painter';
export class PainterFactory {
    static createCircle ({location, radius, color}) {
        return new Circle({location, radius, color});
    }

    static createLine({location1, location2, width, color1, color2}) {
        return new Line({
            x1: location1.x, y1: location1.y, color1,
            x2: location2.x, y2: location2.y, color2,
            width,
        })
    }
}
