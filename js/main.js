document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const quitButton = document.getElementById('quitButton');
    const tutorialButton = document.getElementById('tutorialButton');
    const backToMenuButton = document.getElementById('backToMenuButton');

    const menu = document.getElementById('menu');
    const tutorial = document.getElementById('tutorial');
    const gameContainer = document.getElementById('gameContainer');

    function showSection(section) {
        menu.classList.remove('active');
        tutorial.classList.remove('active');
        gameContainer.classList.remove('active');
        section.classList.add('active');
    }

    const config = {
        type: Phaser.AUTO,
        width: 1500,
        height: 650,
        parent: 'gameContainer',
        physics: {
            default: 'matter',
            matter: {
                gravity: { y: 0.8 },
                bounds: {
                    x: 0,
                    y: 0,
                    width: 3000,
                    height: 8000
                }
            }
        },
        scene: [MenuScene, GameScene, TutorialScene]
    };

    const game = new Phaser.Game(config);

    playButton.addEventListener('click', () => {
        showSection(gameContainer);
        game.scene.stop('MenuScene');
        game.scene.start('GameScene');
    });

    quitButton.addEventListener('click', () => {
        window.close();
    });

    tutorialButton.addEventListener('click', () => {
        showSection(tutorial);
    });

    backToMenuButton.addEventListener('click', () => {
        showSection(menu);
    });
});

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('menuBg', 'assets/background/menuBg.jpg');
    }

    create() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menuBg').setOrigin(0.5).setScale(1.2);
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player1 = null;
        this.player2 = null;
        this.groundY = 750;
        this.jumpForce = -15;
        this.onGroundPlayer1 = true;
        this.onGroundPlayer2 = true;
        this.obstacles = [];
        this.topColliders = [];
        this.grabDistance = 100;
        this.backgroundTransition = null;
    }

    preload() {
        this.load.spritesheet('playerA', 'assets/player/ChikBoy_idle.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerB', 'assets/player/ChikBoy_run.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerC', 'assets/player2/ChikBoy_idle.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerD', 'assets/player2/ChikBoy_run.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('ceuazul', 'assets/background/ceuazul.png');
        this.load.image('background', 'assets/background/final_blended_image_swap.jpg');
        this.load.image('background2', 'assets/background/2205_w015_n001_820a_p30_820.jpg');
        this.load.image('obstacle', 'assets/background/vecteezy_platform-with-desert-for-game-level-interface_15008353.png');
        this.load.image('wall', 'assets/background/wall.jpg');
        this.load.image('menuBg', 'assets/background/menuBg.jpg');
        this.load.image('rope', 'assets/rope.png'); 
    }

    create() {
        // Definir a imagem de fundo
        this.add.image(0, -2100, 'background').setOrigin(0).setScale(1);
        

        this.ground = this.matter.add.image(700, this.groundY + 125, 'background2').setScale(1.1);
        this.ground.setStatic(true);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('playerA', { start: 0, end: 5 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('playerB', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle2',
            frames: this.anims.generateFrameNumbers('playerC', { start: 0, end: 5 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'run2',
            frames: this.anims.generateFrameNumbers('playerD', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        
        const player1Category = this.matter.world.nextCategory();
        const player2Category = this.matter.world.nextCategory();

        this.player1 = this.matter.add.sprite(300, 500, 'playerA').setScale(2);
        this.player2 = this.matter.add.sprite(400, 500, 'playerC').setScale(2);

        this.player1.setCollisionCategory(player1Category);
        this.player1.setCollidesWith([0xFFFFFFFF ^ player2Category]);

        this.player2.setCollisionCategory(player2Category);
        this.player2.setCollidesWith([0xFFFFFFFF ^ player1Category]);

        this.player1.play('idle');
        this.player2.play('idle2');

        this.player1.setFixedRotation();
        this.player2.setFixedRotation();

        this.corda = this.add.graphics();

        this.teclas = this.input.keyboard.addKeys('W,A,S,D,E');
        this.cursors = this.input.keyboard.createCursorKeys();

        this.obstacles = [];
        this.topColliders = [];
        this.onGroundPlayer1 = true;
        this.onGroundPlayer2 = true;

        loadObstacles.call(this, this);
        loadWall.call(this, this);

        this.cameras.main.setBounds(0, this.game.config.height - 8000, 3000, 8000);
        this.matter.world.setBounds(0, this.game.config.height - 8000, 3000, 8000);
        this.cameras.main.startFollow(this.player1, true, 0.05, 0.05);

        this.matter.world.on('collisionactive', this.handleCollisionActive.bind(this));
        this.matter.world.on('collisionend', this.handleCollisionEnd.bind(this));
    }

    update() {
        this.corda.clear();
        this.corda.lineStyle(2, 0xff0000);
        this.corda.beginPath();
        this.corda.moveTo(this.player1.x, this.player1.y);
        this.corda.lineTo(this.player2.x, this.player2.y);
        this.corda.strokePath();

        const midPointX = (this.player1.x + this.player2.x) / 2;
        const midPointY = (this.player1.y + this.player2.y) / 2;
        this.cameras.main.startFollow({ x: midPointX, y: midPointY });

        const distance = Phaser.Math.Distance.Between(this.player1.x, this.player1.y, this.player2.x, this.player2.y);
        const maxDistance = 200;

        if (distance > maxDistance) {
            this.applyForces(distance);
        }

        this.handlePlayerMovement();
    }

    handleCollisionActive(event, bodyA, bodyB) {
        if ((bodyA === this.player1.body && (bodyB === this.ground.body || this.topColliders.includes(bodyB))) ||
            (bodyB === this.player1.body && (bodyA === this.ground.body || this.topColliders.includes(bodyA)))) {
            this.onGroundPlayer1 = true;
        }
        if ((bodyA === this.player2.body && (bodyB === this.ground.body || this.topColliders.includes(bodyB))) ||
            (bodyB === this.player2.body && (bodyA === this.ground.body || this.topColliders.includes(bodyA)))) {
            this.onGroundPlayer2 = true;
        }
    }

    handleCollisionEnd(event, bodyA, bodyB) {
        if ((bodyA === this.player1.body && (bodyB === this.ground.body || this.topColliders.includes(bodyB))) ||
            (bodyB === this.player1.body && (bodyA === this.ground.body || this.topColliders.includes(bodyA)))) {
            this.onGroundPlayer1 = false;
        }
        if ((bodyA === this.player2.body && (bodyB === this.ground.body || this.topColliders.includes(bodyB))) ||
            (bodyB === this.player2.body && (bodyA === this.ground.body || this.topColliders.includes(bodyA)))) {
            this.onGroundPlayer2 = false;
        }
    }

    applyForces(distance) {
        const forceMagnitude = 0.00009;
        if (this.onGroundPlayer1 && !this.onGroundPlayer2) {
            const forceX = (this.player1.x - this.player2.x) * forceMagnitude;
            const forceY = (this.player1.y - this.player2.y) * forceMagnitude;
            this.player2.applyForce({ x: forceX, y: forceY });
        } else if (this.onGroundPlayer2 && !this.onGroundPlayer1) {
            const forceX = (this.player2.x - this.player1.x) * forceMagnitude;
            const forceY = (this.player2.y - this.player1.y) * forceMagnitude;
            this.player1.applyForce({ x: forceX, y: forceY });
        } else {
            const forceX = (this.player2.x - this.player1.x) * forceMagnitude;
            const forceY = (this.player2.y - this.player1.y) * forceMagnitude;
            this.player1.applyForce({ x: forceX, y: forceY });
            this.player2.applyForce({ x: -forceX, y: -forceY });
        }
    }

    handlePlayerMovement() {
        this.player1.setVelocityX(0);
        if (this.teclas.A.isDown) {
            this.player1.setVelocityX(-2);
            this.player1.play('run', true);
            this.player1.setFlipX(true);
        } else if (this.teclas.D.isDown) {
            this.player1.setVelocityX(2);
            this.player1.play('run', true);
            this.player1.setFlipX(false);
        } else {
            this.player1.play('idle', true);
        }

        if (this.teclas.S.isDown) {
            this.player1.setVelocityY(2);
        }

        this.player2.setVelocityX(0);
        if (this.cursors.left.isDown) {
            this.player2.setVelocityX(-2);
            this.player2.play('run2', true);
            this.player2.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.player2.setVelocityX(2);
            this.player2.play('run2', true);
            this.player2.setFlipX(false);
        } else {
            this.player2.play('idle2', true);
        }

        if (this.cursors.down.isDown) {
            this.player2.setVelocityY(2);
        }

        if (Phaser.Input.Keyboard.JustDown(this.teclas.W) && this.onGroundPlayer1) {
            this.player1.setVelocityY(this.jumpForce);
            this.onGroundPlayer1 = false;
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.onGroundPlayer2) {
            this.player2.setVelocityY(this.jumpForce);
            this.onGroundPlayer2 = false;
        }

        if (Phaser.Input.Keyboard.JustDown(this.teclas.E)) {
            if (this.isNearWall(this.player1)) {
                this.grabbingPlayer1 = !this.grabbingPlayer1;
                if (this.grabbingPlayer1) {
                    this.player1.setStatic(true);
                } else {
                    this.player1.setStatic(false);
                }
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.cursors.shift)) {
            if (this.isNearWall(this.player2)) {
                this.grabbingPlayer2 = !this.grabbingPlayer2;
                if (this.grabbingPlayer2) {
                    this.player2.setStatic(true);
                } else {
                    this.player2.setStatic(false);
                }
            }
        }
    }

    isNearWall(player) {
        const distance = Phaser.Math.Distance.Between(player.x, player.y, this.wall.x, this.wall.y);
        return distance < this.grabDistance;
    }
}

function loadObstacles(scene) {
    const obstaclePositions = [
        { x: 500, y: scene.groundY - 400 },
        { x: 700, y: scene.groundY - 650 },
        { x: 1000, y: scene.groundY - 600 },
        { x: 1300, y: scene.groundY - 500 },
        { x: 1600, y: scene.groundY - 600 },
        { x: 1900, y: scene.groundY - 550 },
        { x: 2200, y: scene.groundY - 600 },
        { x: 2000, y: scene.groundY - 800 },
        { x: 1700, y: scene.groundY - 900 },
        { x: 1600, y: scene.groundY - 1050 },
        { x: 1500, y: scene.groundY - 1150 },
        { x: 1000, y: scene.groundY - 1050 },
        { x: 400, y: scene.groundY - 1050 },

        // Novos obstáculos adicionados

    ];

    obstaclePositions.forEach(pos => {
        let obstacle = scene.matter.add.image(pos.x, pos.y, 'obstacle').setScale(0.5);
        obstacle.setStatic(true);
        scene.obstacles.push(obstacle);

        let topCollider = scene.matter.add.rectangle(obstacle.x, obstacle.y - obstacle.displayHeight / 2, obstacle.displayWidth, 10, {
            isStatic: true,
            label: 'topCollider'
        });
        scene.topColliders.push(topCollider);
    });
}


function loadWall(scene) {
    // Ajuste da posição da parede
    scene.wall = scene.matter.add.image(700, scene.groundY - 1200, 'wall').setScale(0.6).setStatic(true);

    // Adicionando mais paredes se necessário
}

class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialScene' });
    }

    create() {
        const backToMenuButton = this.add.text(100, 300, 'Back to Menu', { fontSize: '32px', fill: '#FFF' }).setInteractive();
        backToMenuButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}
