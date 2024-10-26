const main = document.querySelector('.main');
const handfulContainerGame = main.querySelector('.handful-container-game');
const gameHistoryContainer = main.querySelector('.game-history-container');
const gameControlPanel = document.querySelector(".control__panel");
const buttonRestart= main.querySelector('.button__restart');
const titleGame = document.querySelector('.game__title');
const titlePage = main.querySelector('.page__title');
const buttonStart = document.querySelector('.button_type-start');

export function showStart() {
    handfulContainerGame.classList.add('element_hide');
    gameHistoryContainer.classList.add('element_hide');
    gameControlPanel.classList.add('element_hide');
    buttonRestart.classList.add('element_hide');
    titleGame.classList.add('element_hide');

    main.classList.remove('main__game');
    main.classList.add('main__start');

    titlePage.classList.remove('element_hide');
    buttonStart.classList.remove('element_hide');
}

export function showGame() {
    titlePage.classList.add('element_hide');
    buttonStart.classList.add('element_hide');

    main.classList.add('main__game');
    main.classList.remove('main__start');

    handfulContainerGame.classList.remove('element_hide');
    gameHistoryContainer.classList.remove('element_hide');
    gameControlPanel.classList.remove('element_hide');
    buttonRestart.classList.remove('element_hide');
    titleGame.classList.remove('element_hide');
}

