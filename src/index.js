//импортирую стили, чтобы вебпак подключил их к странице
import "./styles/index.css";
//Подключаю функции из других файлов
import {
  openModal,
  closeModal,
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
  containerIsEmpty,
  allHandfulsIsEmpty
} from "../scripts/handful";
import { addHistoryMessage, addErrorMessage } from "../scripts/history";

// создаю переменные с элементами страницы
const main = document.querySelector(".main");
const popupStart = document.querySelector(".popup_type-start");
const buttonStart = document.querySelector(".button_type-start");

const popupHowMany = document.querySelector(".popup_type-how-many");

const buttonStartClose = popupStart.querySelector(".popup__button-close");
const buttonHowManyClose = popupHowMany.querySelector(".popup__button-close");
const buttonGameStart = popupHowMany.querySelector(".popup__button-start");

const formAssign = document.forms.assignItem;

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


const finalPopup = document.querySelector('.popup_type-final');
const finalPopupButtonClose = finalPopup.querySelector('.popup__button-close');
const finalText = finalPopup.querySelector('.end-message');
const finalGif = finalPopup.querySelector('.final-gif');

let messageCounter = 1;
let whoseMove = "Игрок";

//обработчик кнопки закрытия последнего модального окна
finalPopupButtonClose.addEventListener("click", () =>{
  closeModal(finalPopup);
})
//обработчик нажатия начальной кнопки
buttonStart.addEventListener("click", () => {
  openModal(popupStart);
});

//обработчик формы
formStart.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closeModal(popupStart);
  const HandfulsCount = formStart["number-of-handful"].value;
  appendHandful(HandfulPopupContainer, HandfulsCount);
  openModal(popupHowMany);
});

//обработчик закрытия первого модального окна
buttonStartClose.addEventListener("click", () => {
  closeModal(popupStart);
});

//обработчик закрытия второго модального окна
buttonHowManyClose.addEventListener("click", () => {
  closeModal(popupHowMany);
  formStart.reset();
  deleteItemsFromContainer(HandfulPopupContainer);
});

//обработчик кнопки старта игры из последнего модального окна
buttonGameStart.addEventListener("click", () => {
  if (allHandfulsIsEmpty(HandfulPopupContainer)){
    alert('Заполните хотя бы одну кучку');
  }else {
  closeModal(popupHowMany);
  //добавляем кучки в игровой контейнер
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

  //обработчик чекбокса кто ходит первый
  if ((formStart['whoFirst'].checked) && (formStart['against-whom'].value === 'computer')) {  
    setTimeout(() => {  computerMove(handfulContainerGame); }, 500);
  }
  if ((formStart['whoFirst'].checked) && (formStart['against-whom'].value === 'man')) {  
    whoseMove = 'Соперник';
  }
  }
});

//обработчик кнопки рестарта 
buttonRestart.addEventListener("click", () => {
  formStart.reset();
  deleteItemsFromContainer(handfulContainerGame);
  deleteItemsFromContainer(gameHistoryContainer);
  gameControlPanel.reset();
  showStart();
});

//обработчик формы добавление предметов в кучки
formAssign.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const handfulActive = HandfulPopupContainer.querySelector(".handful-checked");
  if (handfulActive) {
    appendItems(handfulActive, countAssign.value);
  }
  formAssign.reset();
});

//обработчик для выбора кучки с помощью клика 
HandfulPopupContainer.addEventListener("click", (evt) => {
  const handfuls = Array.from(HandfulPopupContainer.querySelectorAll("li"));
  handlerHandfulClick(evt, handfuls);
});

// обработчик для выбора кучки с помощью клика  во время игры
handfulContainerGame.addEventListener("click", (evt) => {
  const handfuls = Array.from(handfulContainerGame.querySelectorAll("li"));
  handlerHandfulClick(evt, handfuls);
  const handfulActive = handfulContainerGame.querySelector(".handful-checked");
  if (handfulActive){
  const handfulId = handfulActive.querySelector('.handful__number').textContent;
  panelText.textContent = `Взять из кучки №${handfulId}`;
  }
});

//обработчик ходов
gameControlPanel.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const handfulActive = handfulContainerGame.querySelector(".handful-checked");
  if (handfulActive){
  const handfulActiveValue = handfulActive.querySelector('.handful__count').textContent.substring(0, 2);
  //если из кучки можем взять
  if (canITake(handfulActive, panelInput.value)) {
    takeItemsFromHandful(handfulActive, panelInput.value);  
    addHistoryMessage(gameHistoryContainer, messageCounter, handfulActive, panelInput.value, whoseMove);
    messageCounter++;
    //если забрали всё из кучки, то выведём в историю сообщение об этом
    if (Number(handfulActiveValue) === Number(panelInput.value)) {
      addErrorMessage(gameHistoryContainer,handfulActive, 1);
      clearEmptyHandfuls(handfulContainerGame);
      panelText.textContent = `Взять из кучки №`;
    }
    clearEmptyHandfuls(handfulContainerGame);

    // если контейнер остался пустым, то заканчиваем игру
    if (containerIsEmpty(handfulContainerGame)){
      addErrorMessage(gameHistoryContainer,handfulActive, 2);
      panelText.textContent = `Взять из кучки №`;
      finalText.textContent = `${whoseMove} выиграл!`;
      if (whoseMove != "Компьютер") {
        finalGif.src = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDZnMWF4YTZ2Mnp5eWlkZXRkdTViZTB2Zm82Ynl4N2tham5tOG52byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10FwycrnAkpshW/giphy.gif";
      }

      openModal(finalPopup);
    }
    gameControlPanel.reset();

    //передаём ход противнику (либо ходит компьютер, либо меняем имя на противоположное)
    if(formStart['against-whom'].value === 'computer' && (!containerIsEmpty(handfulContainerGame))){
      setTimeout(() => {  computerMove(handfulContainerGame); }, 500);
    }
    if(formStart['against-whom'].value === 'man' && (!containerIsEmpty(handfulContainerGame))){
      whoseMove = changeWhoseMove(whoseMove);
    }
    //иначе В кучке меньше предметов
  } else {
    addErrorMessage(gameHistoryContainer,handfulActive, 3)
  }
  } else {
    //если нет активных кучек
    if (containerIsEmpty(handfulContainerGame)){
      addErrorMessage(gameHistoryContainer,handfulActive, 2);
      panelText.textContent = `Взять из кучки №`;
      finalText.textContent = `${whoseMove} выиграл!`;
      openModal(finalPopup);
    } else {
      //кучка не выбрана
      addErrorMessage(gameHistoryContainer,handfulActive, 4);
    }
    
  }
  
});

function bestMove(handfulContainerGame){
    //создаём массив кучек
    const handfuls = Array.from(handfulContainerGame.querySelectorAll(".handful"));
    if (handfuls){
    let xorSumm = 0;
    //считаем сумму
    handfuls.forEach((handful) => {
      const handfulCount = handful.querySelector('.handful__count');
      const handfulCountNumber = Number(handfulCount.textContent.substring(0, 2));
      xorSumm = xorSumm ^ handfulCountNumber;
    })
    
    //если сумма равна нулю, то ходим случайно
    if (xorSumm === 0) {
      const randomHandful = handfuls[Math.floor(Math.random() * handfuls.length)];
      const handfulCountNumber = Number(randomHandful.querySelector('.handful__count').textContent.substring(0, 2));
      const randomCount = Math.floor(Math.random() * handfulCountNumber) + 1;
      return{ handful: randomHandful, countRemove: randomCount, random: true};
    }

    let xorSummString = xorSumm.toString(2);
    let dischargeNum = 0;
    for (let i = 0; i < xorSummString.length; i++){
      if (xorSummString[i] === "1"){
        dischargeNum = xorSummString.length - i;
        break;
      }
    }
    // если сумма не равна нулю, то ищем лучший ход
    for(let i = 0; i < handfuls.length; i++){
      const handfulCountNumber = Number(handfuls[i].querySelector('.handful__count').textContent.substring(0, 2));
      const handfulCountBin = handfulCountNumber.toString(2);
      if (dischargeNum <= handfulCountBin.length){
      for(let j = 0; j < handfulCountBin; j++){
        if (handfulCountBin[handfulCountBin.length - Number(dischargeNum)] === "1"){
          const targetHandful = handfulCountNumber ^ xorSumm;
          const handfulToRemove = handfulCountNumber - targetHandful;
          return { handful: handfuls[i], countRemove: handfulToRemove, random: false};
        }
      }
      }
      
    }
  }
}

// обрабатываем ход компьютера с использованием функции лучшего хода
function computerMove(handfulContainerGame){
  whoseMove = 'Компьютер';
  const move = bestMove(handfulContainerGame);
  const currentHandful = move.handful
  const currentCount = currentHandful.querySelector('.handful__count').textContent.substring(0, 2);
  takeItemsFromHandful(move.handful, move.countRemove);  
  addHistoryMessage(gameHistoryContainer, messageCounter, move.handful, move.countRemove, whoseMove);
  messageCounter++;
  //если компьютер забрал всё
  if (Number(currentCount) === Number(move.countRemove)) {
    addErrorMessage(gameHistoryContainer, move.handful, 1);
    clearEmptyHandfuls(handfulContainerGame);
  }
  clearEmptyHandfuls(handfulContainerGame);
  //если контейнер остался пуст, то компьютер выиграл
  if (containerIsEmpty(handfulContainerGame)){
    addErrorMessage(gameHistoryContainer, move.handful, 2);
    panelText.textContent = `Взять из кучки №`;
    finalText.textContent = `${whoseMove} выиграл!`;
    openModal(finalPopup);
    return;
  } 
  whoseMove = 'Игрок';
}

function changeWhoseMove (whoseMove) {
  if (whoseMove === 'Игрок'){
    return 'Соперник';
  }else {
    return 'Игрок';
  }
}

const storageKey = 'snow'
const snow = document.querySelector('.snow')
const snowflakes = document.querySelectorAll('.snow__flake')


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function getRndFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1)
}

snowflakes.forEach(snowflake => {
  snowflake.style.fontSize = getRndFloat(0.7, 1.5) + 'em'
  snowflake.style.animationDuration = getRndInteger(20, 30) + 's'
  snowflake.style.animationDelay = getRndInteger(-1, snowflakes.length / 2) + 's'
})

function changeSnowAnimation(animationName) {
  snow.style.setProperty('--animation-name',  animationName)
}


