export default class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    preload() {
        this.load.image('fundotrofeu', 'assets/background/fundotrofeu.jpg');
    }

    create() {
        // Adiciona a imagem de fundo
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundotrofeu').setOrigin(0.5).setScale(0.8);

        const congratulationsText = 
            `Fiquei surpreendido com vocês! Parabéns!! Ah, quanto ao prêmio? 
Merecem uma pausa para descansar os dedos e um troféu virtual 
(que como é óbvio, vocês não o podem levar, mas a intenção é o que conta, não é?).`;

        const textStyle = { font: '70px Amatic-Bold', fill: '#fff', wordWrap: { width: this.cameras.main.width - 200 } };
        const displayText = this.add.text(100, 50, '', textStyle);

        this.typeText(displayText, congratulationsText, 50, () => {
            const backToMenuButton = this.add.text(this.cameras.main.width / 2, displayText.y + displayText.height + 250, 'Back to Menu', { fontSize: '50px', fill: '#FFF', fontFamily: 'AmaticSC-Regular', padding: { x: 20, y: 10 }, backgroundColor: '#00056d' }).setOrigin(0.5).setInteractive();
            
            backToMenuButton.on('pointerdown', () => {
                this.scene.start('MenuScene');
            });

            // Adiciona efeitos de hover nos botões
            backToMenuButton.on('pointerover', () => {
                backToMenuButton.setStyle({ fill: '#000', backgroundColor: '#ffea00' });
            });
            backToMenuButton.on('pointerout', () => {
                backToMenuButton.setStyle({ fill: '#FFF', backgroundColor: '#00056d' });
            });
        });

        // Adiciona o botão "Back" no canto superior esquerdo
        const backButtonStyle = {
            fontSize: '24px',
            fill: '#FFF',
            fontFamily: 'AmaticSC-Regular',
            backgroundColor: '#00056d',
            padding: { x: 10, y: 5 }
        };

        const backButton = this.add.text(20, 20, 'Back', backButtonStyle).setOrigin(0).setInteractive();
        
        const backButtonGraphics = this.add.graphics();
        backButtonGraphics.fillStyle(0x00056d, 1);
        backButtonGraphics.fillRoundedRect(backButton.x - 10, backButton.y - 5, backButton.width + 20, backButton.height + 10, 10);
        backButton.setDepth(1); // Garante que o texto esteja acima do gráfico
        backButton.graphics = backButtonGraphics; // Adiciona a referência do gráfico ao botão

        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        // Adiciona efeitos de hover no botão "Back"
        backButton.on('pointerover', () => {
            backButton.setStyle({ fill: '#000', backgroundColor: '#ffea00' });
            backButtonGraphics.clear();
            backButtonGraphics.fillStyle(0xffea00, 1).fillRoundedRect(backButton.x - 10, backButton.y - 5, backButton.width + 20, backButton.height + 10, 10);
        });
        backButton.on('pointerout', () => {
            backButton.setStyle({ fill: '#FFF', backgroundColor: '#00056d' });
            backButtonGraphics.clear();
            backButtonGraphics.fillStyle(0x00056d, 1).fillRoundedRect(backButton.x - 10, backButton.y - 5, backButton.width + 20, backButton.height + 10, 10);
        });
    }

    typeText(displayText, fullText, delay, onComplete) {
        let currentIndex = 0;
        const timer = this.time.addEvent({
            delay: delay,
            callback: () => {
                if (currentIndex < fullText.length) {
                    displayText.setText(fullText.substring(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    timer.remove(false);
                    if (onComplete) {
                        onComplete();
                    }
                }
            },
            repeat: fullText.length - 1
        });
    }
}
