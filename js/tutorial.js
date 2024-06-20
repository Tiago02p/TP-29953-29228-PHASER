export default class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialScene' });
    }

    preload() {
        this.load.image('menuBg', 'assets/background/menuBg.jpg');
        this.load.image('player1Img', 'assets/player/ChikBoy_image.png');
        this.load.image('player2Img', 'assets/player2/ChikBoy_image2.png');
    }

    create() {
        // Adiciona a imagem de fundo
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'menuBg').setOrigin(0.5).setScale(0.8);

        // Adiciona o título do tutorial
        const titleStyle = {
            fontSize: '105px',
            fill: '#FFF',
            fontFamily: 'AmaticSC-Regular',
            fontWeight: 'bold',
            align: 'center',
        };
        this.add.text(this.cameras.main.width / 2, 50, 'Tutorial', titleStyle).setOrigin(0.5);

        // Texto dos controles para jogador 1
        const controlsText1 = 
            "A, D para mover\nW para saltar\nS para baixar/planar\nE para agarrar/soltar";
        this.add.text(this.cameras.main.width / 4, 220, controlsText1, { fontSize: '40px', fill: '#000', fontFamily: 'AmaticSC-Regular', align: 'center' }).setOrigin(0.5);

        // Texto dos controles para jogador 2
        const controlsText2 = 
            "Setas para mover\n↑ para saltar\n↓ para baixar/planar\nSHIFT para agarrar/soltar";
        this.add.text(this.cameras.main.width * 3 / 4, 220, controlsText2, { fontSize: '40px', fill: '#000', fontFamily: 'AmaticSC-Regular', align: 'center' }).setOrigin(0.5);

        // Imagem do jogador 1
        this.add.image(this.cameras.main.width / 4, 400, 'player1Img').setOrigin(0.5).setScale(3);

        // Imagem do jogador 2
        this.add.image(this.cameras.main.width * 3 / 4, 400, 'player2Img').setOrigin(0.5).setScale(3);

        // Estilo do botão
        const buttonStyle = {
            fontSize: '50px', // Ajustado o tamanho da fonte
            fill: '#FFF',
            fontFamily: 'AmaticSC-Regular',
            backgroundColor: '#00056d',
            padding: {
                x: 15,
                y: 7
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
                button.x - button.width / 2 - 15,
                button.y - button.height / 2 - 7,
                button.width + 30,
                button.height + 14,
                20 // Bordas arredondadas mais acentuadas
            );
            button.setDepth(1); // Garante que o texto esteja acima do gráfico
            button.graphics = graphics; // Adiciona a referência do gráfico ao botão

            return button;
        };

        // Adiciona o botão de voltar ao menu
        const backToMenuButton = createButton(this, this.cameras.main.width / 2, this.cameras.main.height - 100, 'Back to Menu');

        // Adiciona os eventos de clique
        backToMenuButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        // Adiciona efeitos de hover nos botões
        backToMenuButton.on('pointerover', () => {
            backToMenuButton.setStyle({ fill: '#000', backgroundColor: '#ffea00' });
            backToMenuButton.graphics.clear();
            backToMenuButton.graphics.fillStyle(0xffea00, 1).fillRoundedRect(
                backToMenuButton.x - backToMenuButton.width / 2 - 15,
                backToMenuButton.y - backToMenuButton.height / 2 - 7,
                backToMenuButton.width + 30,
                backToMenuButton.height + 14,
                20
            );
        });
        backToMenuButton.on('pointerout', () => {
            backToMenuButton.setStyle(buttonStyle);
            backToMenuButton.graphics.clear();
            backToMenuButton.graphics.fillStyle(0x00056d, 1).fillRoundedRect(
                backToMenuButton.x - backToMenuButton.width / 2 - 15,
                backToMenuButton.y - backToMenuButton.height / 2 - 7,
                backToMenuButton.width + 30,
                backToMenuButton.height + 14,
                20
            );
        });
    }
}
