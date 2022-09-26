import { RENDERER_TYPE } from 'pixi.js';
import { Castle } from './entities/castle';
import { Path } from './entities/path';
import { Player } from './entities/player';
import { CastleUi } from './ui/castle.ui';
import { PathUi } from './ui/path.ui';
import { PlayerUi } from './ui/player.ui';
import { renderer, Colors } from './ui/renderer';
import { app } from './ui/application';
import { Location } from './types/location';

// Resize function window
function resize() {
	// Resize the renderer
	app.resize(window.innerWidth, window.innerHeight);

  // You can use the 'screen' property as the renderer visible
  // area, this is more useful than view.width/height because
  // it handles resolution
//   rect.position.set(app.screen.width, app.screen.height);
}



function setupWindow (window, document) {
    // The application will create a canvas element for you that you
    // can then insert into the DOM
    document.body.appendChild(app.domElement);


    // Listen for window resize events
    window.addEventListener('resize', resize);
    resize();

}


// TODO: generate random locations
const locations = [
    [100,100],
    [600,100],
    [200, 600],
    [500,450],
    [600, 300],
    [100, 400],
    [500, 700],
    [900, 300],
    [1000, 100],
    [1000, 600],
];

function pathBetween(castle1, castle2) {
    return new Path({
        castle1: castle1,
        castle2: castle2,
    });
}


function setupCastles ({
    numberOfCastles,
    numberOfPlayers,
}) {
    const result = [];
    for (let i = 0; i< numberOfCastles; i++) {
        const location = locations[i];

        const castle = new Castle(new Location(...location));

        castle.strength = 10;
        result.push(castle);
        const castleUi = new CastleUi(castle);

        if (i < numberOfPlayers) {
            const player = new Player('demo', 'demo');
            const playerUi = new PlayerUi(player, Object.values(Colors)[i]);
            castle.ownerKing = player;
            castleUi.playerUi = playerUi;
            renderer.addPlayer(playerUi);
        }
        renderer.addCastle(castleUi);
    }
    return result;
}

// {Castle} (not CastleUi)
function setupPaths (castles) {
    const result = [
        pathBetween(castles[0], castles[1]),
        pathBetween(castles[0], castles[2]),
        pathBetween(castles[1], castles[3]),
        pathBetween(castles[1], castles[4]),
        pathBetween(castles[2], castles[3]),
        pathBetween(castles[2], castles[6]),
        pathBetween(castles[0], castles[5]),
        pathBetween(castles[5], castles[4]),
        pathBetween(castles[3], castles[4]),
        pathBetween(castles[3], castles[6]),
        pathBetween(castles[5], castles[6]),
        pathBetween(castles[6], castles[7]),
        pathBetween(castles[7], castles[8]),
        pathBetween(castles[8], castles[9]),
        pathBetween(castles[9], castles[7]),
        pathBetween(castles[7], castles[4]),
        pathBetween(castles[8], castles[1]),
        pathBetween(castles[6], castles[9]),
    ];

    for (const path of result) {
        renderer.addPath(new PathUi({
            castleUi1: renderer.getCastleUi(path.castle1.id),
            castleUi2: renderer.getCastleUi(path.castle2.id),
        }));
    }

    return result;
}

function setupCanvas () {
    renderer.setupStage();
}

export {
    setupWindow,
    setupCastles,
    setupPaths,
    setupCanvas, // TODO: use zIndex instead
}
