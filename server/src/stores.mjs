

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

    toJSON () {
        return this.all();
    }
}


const gameSessions = new Store();


export {
    gameSessions,
    Store
}
