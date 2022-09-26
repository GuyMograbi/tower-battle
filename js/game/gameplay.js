export class Gameplay {
    constructor({castles, paths}) {
        this.castles = castles;
        this.paths = paths;
    }

    start () {
        setInterval(() => this.addStrengthToCastles(), 1000);
    }

    addStrengthToCastles () {
        for (const castle of this.castles) {
            if (castle.strength < 50) {
                castle.strength = castle.strength + 1;
            }

        }
    }
}

