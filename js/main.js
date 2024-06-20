import GameScene from "./game.js";
import MenuScene from "./menu.js";
import TutorialScene from "./tutorial.js";
import WinScene from "./win.js";

const config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 650,
    parent: 'gameContainer',
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0.3 },
            bounds: {
                x: 0,
                y: 0,
                width: 3000,
                height: 8000
            }
        }
    },
    scene: [MenuScene, GameScene, TutorialScene, WinScene]
};

const game = new Phaser.Game(config);
