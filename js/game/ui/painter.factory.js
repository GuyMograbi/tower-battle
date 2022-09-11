import {
    Circle
} from './painter';
export class PainterFactory {
    static createCircle ({location, radius, color}) {
        return new Circle({location, radius, color});
    }
}