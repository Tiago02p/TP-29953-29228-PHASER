export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('menuBg', 'assets/background/menuBg.jpg');
    }

    create() {
        // Adiciona a imagem de fundo
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menuBg').setOrigin(0.5).setScale(0.8);

        // Adiciona o título
        const titleStyle = {
            fontSize: '120px',
            fill: '#FFF',
            fontFamily: 'AmaticSC-Regular',
            fontWeight: 'bold',
            align: 'center',
        };
        const title = this.add.text(this.cameras.main.width / 2, 150, 'Beaks & Wings', titleStyle).setOrigin(0.5);

        // Estilo do texto dos botões
        const buttonStyle = {
            fontSize: '40px', 
            fill: '#FFF',
            fontFamily: 'AmaticSC-Regular',
            backgroundColor: '#00056d',
            padding: {
                x: 10, 
                y: 5
            }
        };

        // Função para criar botões com bordas arredondadas
        const createButton = (scene, x, y, text) => {
            const button = scene.add.text(x, y, text, buttonStyle)
                .setOrigin(0.5)
                .setInteractive();

            // Adiciona um retângulo arredondado atrás do texto do botão
            const graphics = scene.add.graphics();
            graphics.fillStyle(0x00056d, 1);
            graphics.fillRoundedRect(
                button.x - button.width / 2 - 10,
                button.y - button.height / 2 - 5,
                button.width + 20,
                button.height + 10,
                15
            );
            button.setDepth(1); // Garante que o texto esteja acima do gráfico
            button.graphics = graphics; // Adiciona a referência do gráfico ao botão

            return button;
        };

        // Adiciona os botões de texto
        const playButton = createButton(this, this.cameras.main.width / 2, 300, 'Play');
        const tutorialButton = createButton(this, this.cameras.main.width / 2, 375, 'Tutorial'); // Ajustado para reduzir o espaçamento
        const quitButton = createButton(this, this.cameras.main.width / 2, 450, 'Quit'); // Ajustado para reduzir o espaçamento

        // Adiciona os eventos de clique
        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        tutorialButton.on('pointerdown', () => {
            this.scene.start('TutorialScene');
        });

        quitButton.on('pointerdown', () => {
            this.game.destroy(true);
        });

        // Adiciona efeitos de hover nos botões
        playButton.on('pointerover', () => {
            playButton.setStyle({ fill: '#000', backgroundColor: '#00ff00' });
            playButton.graphics.clear();
            playButton.graphics.fillStyle(0x00ff00, 1).fillRoundedRect(
                playButton.x - playButton.width / 2 - 10,
                playButton.y - playButton.height / 2 - 5,
                playButton.width + 20,
                playButton.height + 10,
                10
            );
        });
        playButton.on('pointerout', () => {
            playButton.setStyle(buttonStyle);
            playButton.graphics.clear();
            playButton.graphics.fillStyle(0x00056d, 1).fillRoundedRect(
                playButton.x - playButton.width / 2 - 10,
                playButton.y - playButton.height / 2 - 5,
                playButton.width + 20,
                playButton.height + 10,
                10
            );
        });

        tutorialButton.on('pointerover', () => {
            tutorialButton.setStyle({ fill: '#000', backgroundColor: '#ffea00' });
            tutorialButton.graphics.clear();
            tutorialButton.graphics.fillStyle(0xffea00, 1).fillRoundedRect(
                tutorialButton.x - tutorialButton.width / 2 - 10,
                tutorialButton.y - tutorialButton.height / 2 - 5,
                tutorialButton.width + 20,
                tutorialButton.height + 10,
                10
            );
        });
        tutorialButton.on('pointerout', () => {
            tutorialButton.setStyle(buttonStyle);
            tutorialButton.graphics.clear();
            tutorialButton.graphics.fillStyle(0x00056d, 1).fillRoundedRect(
                tutorialButton.x - tutorialButton.width / 2 - 10,
                tutorialButton.y - tutorialButton.height / 2 - 5,
                tutorialButton.width + 20,
                tutorialButton.height + 10,
                10
            );
        });

        quitButton.on('pointerover', () => {
            quitButton.setStyle({ fill: '#000', backgroundColor: '#ff0000' });
            quitButton.graphics.clear();
            quitButton.graphics.fillStyle(0xff0000, 1).fillRoundedRect(
                quitButton.x - quitButton.width / 2 - 10,
                quitButton.y - quitButton.height / 2 - 5,
                quitButton.width + 20,
                quitButton.height + 10,
                10
            );
        });
        quitButton.on('pointerout', () => {
            quitButton.setStyle(buttonStyle);
            quitButton.graphics.clear();
            quitButton.graphics.fillStyle(0x00056d, 1).fillRoundedRect(
                quitButton.x - quitButton.width / 2 - 10,
                quitButton.y - quitButton.height / 2 - 5,
                quitButton.width + 20,
                quitButton.height + 10,
                10
            );
        });
    }
}
