document.addEventListener('DOMContentLoaded', (event) => {
    const playButton = document.getElementById('playButton');
    const quitButton = document.getElementById('quitButton');
    
    // Acessa a cena 'Example'
    const gameScene = game.scene.keys['Example'];

    playButton.addEventListener('click', () => {
        playButton.style.display = 'none';
        quitButton.style.display = 'none';
        gameScene.scene.resume();
    });

    quitButton.addEventListener('click', () => {
        window.close();
    });

    // Pausar a cena no início até que o botão "Play" seja clicado
    gameScene.scene.pause();
});
