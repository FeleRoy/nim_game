import './styles/index.css'
import { openModal, closeModal, closeByEsc, closeByOverlay } from "../scripts/modal";
import { showGame, showStart } from '../scripts/screen';
import { createHandful, appendHandful, appendImage, deleteItemsFromContainer, appendItems, unchekedAllHandful, makeChecked } from '../scripts/handful';
const main = document.querySelector('.main');
const popupStart = document.querySelector('.popup_type-start');
const buttonStart = document.querySelector('.button_type-start');
const buttonNext = popupStart.querySelector('.popup__button');
const popupHowMany = document.querySelector('.popup_type-how-many');

const buttonStartClose = popupStart.querySelector('.popup__button-close');
const buttonHowManyClose = popupHowMany.querySelector('.popup__button-close');
const buttonGameStart = popupHowMany.querySelector('.popup__button-start');

const formAssign = document.forms.assignItem;
const buttonAssign = formAssign.querySelector('.assign-button');
const countAssign = formAssign.assignCount;

const HandfulPopupContainer = popupHowMany.querySelector('.handful-container');

const handfulContainerGame = main.querySelector('.handful-container-game');
const gameHistoryContainer = main.querySelector('.game-history-container');
const gameControlPanel = main.querySelector('.conrtol__panel');
const buttonRestart= main.querySelector('.button__restart');
const titleGame = document.querySelector('.game__title');

const titlePage = main.querySelector('.page__title');

const formStart = document.forms['start-game'];


buttonStart.addEventListener('click', ()=> {
    openModal(popupStart);
});

formStart.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    closeModal(popupStart);
    const HandfulsCount = formStart['number-of-handful'].value;
    appendHandful(HandfulPopupContainer,HandfulsCount);
    openModal(popupHowMany);
});

buttonStartClose.addEventListener('click', ()=>{
    closeModal(popupStart);
})
buttonHowManyClose.addEventListener('click', ()=> {
    closeModal(popupHowMany);
    formStart.reset();
    deleteItemsFromContainer(HandfulPopupContainer);

})

buttonGameStart.addEventListener('click', () =>{
    closeModal(popupHowMany);
    showGame();
})

buttonRestart.addEventListener('click', () =>{
    formStart.reset();
    showStart();
})

formAssign.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    const handfulActive = HandfulPopupContainer.querySelector('.handful-checked');
    if(handfulActive){
        appendItems(handfulActive, countAssign.value);
    }
    
   
    
})

HandfulPopupContainer.addEventListener('click', (evt)=>{
    const handfuls = Array.from(HandfulPopupContainer.querySelectorAll('li'));
    // если цель наша кучка
    if (evt.target.classList.contains('handful')) {
        unchekedAllHandful(handfuls);
        makeChecked(evt.target);
    }
    // если родитель наша кучка
    if(evt.target.parentNode.classList.contains('handful')){
        unchekedAllHandful(handfuls);
        makeChecked(evt.target.parentNode);
    }
    // если родитель родителя это наша кучка
    if(evt.target.parentNode.parentNode.classList.contains('handful')){
        unchekedAllHandful(handfuls);
        makeChecked(evt.target.parentNode.parentNode);
    }

});


