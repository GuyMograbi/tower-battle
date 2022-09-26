import { app } from './application';

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
    constructor () {
        this.players = [];
        this.castles = [];
        this.paths = [];
    }

    getPlayer (playerId) {
        return this.players.find(p => p.id === playerId);
    }

    getCastleUi (castleId) {
        return this.castles.find(c => c.id === castleId);
    }

    // {PlayerUi}
    addPlayer (player) {
        this.players.push(player);
    }

    // {CastleUi}
    addCastle (castle) {
        this.castles.push(castle);
        // app.stage.addChild(castle.graphics.element);
    }

    // {PathUi}
    addPath (path) {
        this.paths.push(path);
        // app.stage.addChild(path.graphics.element);
    }

    // TODO: use container
    setupStage () {
        for (const path of this.paths) {
            app.stage.addChild(path.graphics.element);
        }

        for (const castle of this.castles) {
            app.stage.addChild(castle.graphics.element);
        }
    }

    // TODO: render container instead.
    render () {
        for (const path of this.paths) {
            path.render();
        }
        for (const castle of this.castles) {
            castle.render();
        }


    }
}

const renderer = new Renderer();

export {
    renderer,
    Colors,
}

