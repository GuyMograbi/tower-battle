import * as PIXI from 'pixi.js';
import { app } from './ui/application';
import { renderer } from './ui/renderer';
import { setupWindow, setupCastles } from './setup';

setupWindow(window, document);
const castles = setupCastles({
    numberOfCastles: 10,
    numberOfPlayers: 3,
});

setInterval(() => {
    for (const castle of castles) {
        if (castle.strength < 50) {
            castle.strength = castle.strength + 1;
        }
    }
}, 1000);

app.ticker.add(() => renderer.render());

// // draw graphics!
// // https://pixijs.io/guides/basics/graphics.html
// let obj = new PIXI.Graphics();

// obj.beginFill(0xff0000);
// obj.drawRect(0, 0, 400, 200);
// obj.endFill();
// // Add it to the stage to render
// app.stage.addChild(obj);
// ///

// function changeColor () {
//     console.log('changing color');
//     // this.tint = 0x00ff00;
//     obj.beginFill(0x00ff00);
//     obj.drawRect(0, 0, 200, 100);
//     obj.endFill();
// }
// obj.interactive = true;
// obj.buttonMode = true;
// obj.on('pointerdown', changeColor);


// // load the texture we need
// app.loader.add('bunny', Bunny).load((loader, resources) => {
//     // This creates a texture from a 'bunny.png' image
//     const bunny = new PIXI.Sprite(resources.bunny.texture);

//     // Rotate around the center
//     bunny.anchor.x = 0.5;
//     bunny.anchor.y = 0.5;

//     // Add the bunny to the scene we are building
//     app.stage.addChild(bunny);

//     // Listen for frame updates
//     app.ticker.add(() => {
//          // Setup the position of the bunny
//         bunny.x = app.renderer.width / 2;
//         bunny.y = app.renderer.height / 2;
//          // each frame we spin the bunny around a bit
//         bunny.rotation += 0.01;
//     });
// });
