/**
 * Store to keep UI elements for later reference
 */


class Store {

    constructor () {
        this.byId = {};
        // this.toBeRemoved = [];
    }

    add (element) {
        this.byId[element.id] = element;
    }

    find ({id}) {
        return this.byId[id];
    }

    all () {
        return Object.values(this.byId);
    }

    remove (element) {
        delete this.byId[element.id];
    }
}


const castles = new Store();
const players = new Store();
const projectiles = new Store();
const paths = new Store();

module.exports = {
    castles,
    players,
    projectiles,
    paths,
}
