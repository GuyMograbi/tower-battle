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
    }

    // {PlayerUi}
    addPlayer (player) {
        this.players.push(player);
    }

    // {CastleUi}
    addCastle (castle) {
        this.castles.push(castle);
        app.stage.addChild(castle.graphics.element);
    }

    render () {
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

