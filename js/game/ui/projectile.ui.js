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

    get id () {
        return this.projectile.id;
    }

    get exists () {
        return this.projectile.exists;
    }


    render () {
        this.graphics.location = this.projectile.location;
        this.graphics.draw();
    }

    clear () {
        this.graphics.clear();
    }
}
