export class GameScene extends Phaser.Scene {
    constructor() {
        super("gameScene")
    }

    create() {
        this.add.text(100,100, "Hello world!")
    }
}