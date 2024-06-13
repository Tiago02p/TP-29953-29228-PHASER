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

    playButton.addEventListener('click', () => {
        showSection(gameContainer);
        startGame();
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

    function startGame() {
        game.scene.start('GameScene');
    }
});
