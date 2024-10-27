import "./styles/index.css";
import {
  openModal,
  closeModal,
  closeByEsc,
  closeByOverlay,
} from "../scripts/modal";
import { showGame, showStart } from "../scripts/screen";
import {
  createHandful,
  appendHandful,
  appendImage,
  deleteItemsFromContainer,
  appendItems,
  unchekedAllHandful,
  makeChecked,
  handlerHandfulClick,
  clearEmptyHandfuls,
  takeItemsFromHandful,
  canITake,
  containerIsEmpty
} from "../scripts/handful";
import { addHistoryMessage, addErrorMessage } from "../scripts/history";
const main = document.querySelector(".main");
const popupStart = document.querySelector(".popup_type-start");
const buttonStart = document.querySelector(".button_type-start");
const buttonNext = popupStart.querySelector(".popup__button");
const popupHowMany = document.querySelector(".popup_type-how-many");

const buttonStartClose = popupStart.querySelector(".popup__button-close");
const buttonHowManyClose = popupHowMany.querySelector(".popup__button-close");
const buttonGameStart = popupHowMany.querySelector(".popup__button-start");

const formAssign = document.forms.assignItem;
const buttonAssign = formAssign.querySelector(".assign-button");
const countAssign = formAssign.assignCount;

const HandfulPopupContainer = popupHowMany.querySelector(".handful-container");

const handfulContainerGame = main.querySelector(".handful-container-game");
const gameHistoryContainer = main.querySelector(".game-history-container");
const buttonRestart = main.querySelector(".button__restart");
const titleGame = document.querySelector(".game__title");

const titlePage = main.querySelector(".page__title");

const formStart = document.forms["start-game"];

const gameControlPanel = document.querySelector(".control__panel");
const panelText = gameControlPanel.querySelector(".panel-text");
const panelInput = gameControlPanel.panelInput;
const buttonControl = gameControlPanel.querySelector(".control__button");

const finalPopup = document.querySelector('.popup_type-final');
const finalPopupButtonClose = finalPopup.querySelector('.popup__button-close');
const finalText = finalPopup.querySelector('.end-message')
let messageCounter = 1;

finalPopupButtonClose.addEventListener("click", () =>{
  closeModal(finalPopup);
})

buttonStart.addEventListener("click", () => {
  openModal(popupStart);
});

formStart.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closeModal(popupStart);
  const HandfulsCount = formStart["number-of-handful"].value;
  appendHandful(HandfulPopupContainer, HandfulsCount);
  openModal(popupHowMany);
});

buttonStartClose.addEventListener("click", () => {
  closeModal(popupStart);
});
buttonHowManyClose.addEventListener("click", () => {
  closeModal(popupHowMany);
  formStart.reset();
  deleteItemsFromContainer(HandfulPopupContainer);
});

buttonGameStart.addEventListener("click", () => {
  closeModal(popupHowMany);
  const handfuls = Array.from(
    HandfulPopupContainer.querySelectorAll(".handful")
  );
  handfuls.forEach((item) => {
    handfulContainerGame.append(item);
  });
  clearEmptyHandfuls(handfulContainerGame);

  const handfulActive = handfulContainerGame.querySelector(".handful-checked");
  if(handfulActive){
    const handfulId = handfulActive.querySelector('.handful__number').textContent;
    panelText.textContent = `Взять из кучки №${handfulId}`;
  }
  showGame();
});

buttonRestart.addEventListener("click", () => {
  formStart.reset();
  deleteItemsFromContainer(handfulContainerGame);
  showStart();
});

formAssign.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const handfulActive = HandfulPopupContainer.querySelector(".handful-checked");
  if (handfulActive) {
    appendItems(handfulActive, countAssign.value);
  }
  formAssign.reset();
});

HandfulPopupContainer.addEventListener("click", (evt) => {
  const handfuls = Array.from(HandfulPopupContainer.querySelectorAll("li"));
  handlerHandfulClick(evt, handfuls);
});

handfulContainerGame.addEventListener("click", (evt) => {
  const handfuls = Array.from(handfulContainerGame.querySelectorAll("li"));
  handlerHandfulClick(evt, handfuls);
  const handfulActive = handfulContainerGame.querySelector(".handful-checked");
  if (handfulActive){
  const handfulId = handfulActive.querySelector('.handful__number').textContent;
  panelText.textContent = `Взять из кучки №${handfulId}`;
  }
});

gameControlPanel.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const handfulActive = handfulContainerGame.querySelector(".handful-checked");
  if (handfulActive){
  const handfulActiveValue = handfulActive.querySelector('.handful__count').textContent.substring(0, 2);
  if (canITake(handfulActive, panelInput.value)) {
    takeItemsFromHandful(handfulActive, panelInput.value);  
    addHistoryMessage(gameHistoryContainer, messageCounter, handfulActive, panelInput.value, 'Человек');
    messageCounter++;
    if (Number(handfulActiveValue) === Number(panelInput.value)) {
      addErrorMessage(gameHistoryContainer,handfulActive, 1);
      clearEmptyHandfuls(handfulContainerGame);
    }
    clearEmptyHandfuls(handfulContainerGame);
    if (containerIsEmpty(handfulContainerGame)){
      addErrorMessage(gameHistoryContainer,handfulActive, 2);
      panelText.textContent = `Взять из кучки №`;
      finalText.textContent = `Кто-то выиграл!`;
      openModal(finalPopup);
    }
    gameControlPanel.reset();
  } else {
    addErrorMessage(gameHistoryContainer,handfulActive, 3)
  }
  } else {
    //если нет активных кучек
    if (containerIsEmpty(handfulContainerGame)){
      addErrorMessage(gameHistoryContainer,handfulActive, 2);
      panelText.textContent = `Взять из кучки №`;
      finalText.textContent = `Кто-то выиграл!`;
      openModal(finalPopup);
    } else {
      addErrorMessage(gameHistoryContainer,handfulActive, 4);
    }
    
  }
  console.log(computerMove(handfulContainerGame));
});

function computerMove(handfulContainerGame){
    const handfuls = Array.from(handfulContainerGame.querySelectorAll(".handful"));
    if (handfuls){
    let xorSumm = 0;
    handfuls.forEach((handful) => {
      const handfulCount = handful.querySelector('.handful__count');
      const handfulCountNumber = Number(handfulCount.textContent.substring(0, 2));
      xorSumm = xorSumm ^ handfulCountNumber;
    })
    
    if (xorSumm === 0) {
      const randomHandful = handfuls[Math.floor(Math.random() * handfuls.length)];
      const handfulCountNumber = Number(randomHandful.querySelector('.handful__count').textContent.substring(0, 2));
      const randomCount = Math.floor(Math.random() * handfulCountNumber) + 1;



      return{ handful: randomHandful, countRemove: randomCount, random: true};
    }

    for(let i = 0; i < handfuls.length; i++){
      const handfulCountNumber = Number(handfuls[i].querySelector('.handful__count').textContent.substring(0, 2));
      const targetHandful = handfulCountNumber ^ xorSumm;
      if (targetHandful < handfulCountNumber){
        const handfulToRemove = handfulCountNumber - targetHandful;
        return { handful: handfuls[i], countRemove: handfulToRemove, random: false};
      }
    }
  }
}