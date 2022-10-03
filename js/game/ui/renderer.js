import { app } from './application';
import { castles, paths, projectiles } from './ui-elements.store';

const Colors = {
    BLUE: 'blue',
    PINK: 'pink',
    ORANGE: 'orange',
    GRAY: 'gray',
    YELLOW: 'yellow',
    GREEN: 'green',
    PURPLE: 'purple'
}


class Renderer {

    // TODO: use container
    setupStage () {
        console.log(`adding ${paths.all().length} paths to stage`);
        for (const path of paths.all()) {
            app.stage.addChild(path.graphics.element);
        }

        console.log(`adding ${castles.all().length} castles to stage`);
        for (const castle of castles.all()) {
            app.stage.addChild(castle.graphics.element);
        }
    }

    addProjectileToStage (projectile) {
        app.stage.addChild(projectile.graphics.element);
    }

    // TODO: render container instead.
    render () {
        for (const path of paths.all()) {
            path.render();
        }
        for (const castle of castles.all()) {
            castle.render();
        }
        for (const projectile of projectiles.all()) {
            projectile.render();
        }
    }
}

const renderer = new Renderer();

export {
    renderer,
    Colors,
}

