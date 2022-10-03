import { PainterFactory } from './painter.factory';
import { castles }  from './ui-elements.store';


export class ProjectileUi {
    constructor({projectile}) {
        this.projectile = projectile;
        this.fromCastleUi = castles.find(projectile.fromCastle);
        this.graphics = PainterFactory.createCircle({
            location: this.projectile.location,
            radius: projectile.power,
            color: this.fromCastleUi.color,
        });
    }

    render () {
        debugger;
        this.graphics.location = this.projectile.location;
        this.graphics.draw();
    }
}
