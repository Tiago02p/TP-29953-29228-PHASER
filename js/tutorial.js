class TutorialScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TutorialScene' });
    }

    preload() {
        this.load.image('menuBg', 'assets/background/wallpaperflare.com_wallpaper.jpg');
        this.load.audio('backgroundMusic', 'assets/audio/tutorial_music.mp3');
    }

    create() {
        // Adicionar a imagem de fundo
        this.add.image(0, 0, 'menuBg').setOrigin(0).setScale(1.5);

        // Adicionar música de fundo
        this.sound.add('backgroundMusic', { loop: true, volume: 0.5 }).play();

        // Adicionar texto com animações
        this.addDynamicText(100, 100, 'Tutorial', { font: '40px Arial', fill: '#ffffff' });
        this.addDynamicText(100, 200, 'Use W, A, S, D para mover o Player 1', { font: '40px Arial', fill: '#ffffff' });
        this.addDynamicText(100, 300, 'Use as setas para mover o Player 2', { font: '40px Arial', fill: '#ffffff' });

        // Adicionar botão para voltar ao menu
        const backButton = this.add.text(100, 500, 'Back to Menu', { font: '30px Arial', fill: '#ff0000' })
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MenuScene');
            });

        backButton.on('pointerover', () => backButton.setStyle({ fill: '#ff8080' }));
        backButton.on('pointerout', () => backButton.setStyle({ fill: '#ff0000' }));
    }

    addDynamicText(x, y, text, style) {
        const txt = this.add.text(x, y, text, style);
        this.tweens.add({
            targets: txt,
            alpha: { from: 0, to: 1 },
            y: '+=10',
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
        });
        return txt;
    }
}

export default TutorialScene;
