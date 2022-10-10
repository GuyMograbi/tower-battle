

import { PainterFactory } from './painter.factory';
import { Location, EventEmitter, Constants } from '../types';
import { castles } from './ui-elements.store';


export class PathUi extends EventEmitter {
    constructor({path}) {
        super();
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

        this.graphics.onClick = (clickEvent) => {
            const eventLocation = new Location(clickEvent.data.global.x, clickEvent.data.global.y);

            const distanceFrom1 = eventLocation.distanceFrom(this.castleUi1.location);
            const distanceFrom2 = eventLocation.distanceFrom(this.castleUi2.location);
            const [originCastle, targetCastle] = distanceFrom1 < distanceFrom2 ?
                [this.castleUi1, this.castleUi2] :
                [this.castleUi2, this.castleUi1];
            this.emit(Constants.EVENT_PROJECTILE_FIRED, {originCastle, targetCastle});
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
