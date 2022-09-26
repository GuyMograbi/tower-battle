export class PlayerUi {
    constructor(player, color) {
        this.player = player;
        this.color = color;
    }

    get id () {
        return this.player.id;
    }
}
