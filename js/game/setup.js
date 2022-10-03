import { RENDERER_TYPE } from 'pixi.js';
import { Castle } from './entities/castle';
import { Path } from './entities/path';
import { Player } from './entities/player';
import { Projectile } from './entities/projectile';
import { CastleUi } from './ui/castle.ui';
import { PathUi } from './ui/path.ui';
import { PlayerUi } from './ui/player.ui';
import { castles, paths, players, projectiles } from './ui/ui-elements.store';
import { renderer, Colors } from './ui/renderer';
import { app } from './ui/application';
import { Location } from './types/location';
import {ProjectileUi} from "./ui/projectile.ui";

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
            players.add(playerUi);
        }
        castles.add(castleUi);
    }
    return result;
}

// {Castle} (not CastleUi)
function setupPaths (castlesArr) {
    const result = [
        pathBetween(castlesArr[0], castlesArr[1]),
        pathBetween(castlesArr[0], castlesArr[2]),
        pathBetween(castlesArr[1], castlesArr[3]),
        pathBetween(castlesArr[1], castlesArr[4]),
        pathBetween(castlesArr[2], castlesArr[3]),
        pathBetween(castlesArr[2], castlesArr[6]),
        pathBetween(castlesArr[0], castlesArr[5]),
        pathBetween(castlesArr[5], castlesArr[4]),
        pathBetween(castlesArr[3], castlesArr[4]),
        pathBetween(castlesArr[3], castlesArr[6]),
        pathBetween(castlesArr[5], castlesArr[6]),
        pathBetween(castlesArr[6], castlesArr[7]),
        pathBetween(castlesArr[7], castlesArr[8]),
        pathBetween(castlesArr[8], castlesArr[9]),
        pathBetween(castlesArr[9], castlesArr[7]),
        pathBetween(castlesArr[7], castlesArr[4]),
        pathBetween(castlesArr[8], castlesArr[1]),
        pathBetween(castlesArr[6], castlesArr[9]),
    ];

    for (const path of result) {
        paths.add(new PathUi({path}));
    }

    return result;
}

function setupProjectilePoc (castles) {
    const projectile = new Projectile({power: 10, fromCastle: castles[0], toCastle: castles[1]});
    const projectileUi = new ProjectileUi({projectile});
    projectiles.add(projectileUi);
    renderer.addProjectileToStage(projectileUi);
    projectile.startMoving();
}

function setupCanvas () {
    renderer.setupStage();
}

export {
    setupWindow,
    setupCastles,
    setupPaths,
    setupCanvas, // TODO: use zIndex instead
    setupProjectilePoc,
}
