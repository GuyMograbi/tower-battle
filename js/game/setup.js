import { RENDERER_TYPE } from 'pixi.js';
import { Castle } from './entities/castle';
import { Player } from './entities/player';
import { CastleUi } from './ui/castle.ui';
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

export {
    setupWindow,
    setupCastles
}
