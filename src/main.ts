import Phaser from "phaser"
import {GameScene} from "./scenes/GameScene.ts"

new Phaser.Game({
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: "app",
    pixelArt: true,
    physics: {
        default: 'arcade'
    },
    scene: [
        GameScene
    ]
})