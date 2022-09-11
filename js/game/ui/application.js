import * as PIXI from 'pixi.js';


class Application {
    constructor () {
        // The application will create a renderer using WebGL, if possible,
        // with a fallback to a canvas render. It will also setup the ticker
        // and the root stage PIXI.Container
        this.pixiApp = new PIXI.Application();
    }

    get domElement () {
        return this.pixiApp.view;
    }

    resize (width, height) {
        this.pixiApp.renderer.resize(width, height);
    }

    get renderer () {
        return this.pixiApp.renderer;
    }


    // TODO: do I really need this?
    get ticker () {
        return this.pixiApp.ticker;
    }

    get stage () {
        return this.pixiApp.stage;
    }



}

const app = new Application();
export { 
    app,
}