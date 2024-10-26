import './styles/index.css'
import { openModal, closeModal, closeByEsc, closeByOverlay } from "../scripts/modal";

const popupStart = document.querySelector('.popup_type-start');
const buttonStart = document.querySelector('.button_type-start');
const buttonNext = popupStart.querySelector('.popup__button');
const popupHowMany = document.querySelector('.popup_type-how-many');

const buttonStartClose = popupStart.querySelector('.popup__button-close');
const buttonHowManyClose = popupHowMany.querySelector('.popup__button-close');

buttonStart.addEventListener('click', (evt)=> {
    openModal(popupStart);
});

buttonNext.addEventListener('click', (evt)=>{
    evt.preventDefault();
    closeModal(popupStart);
    openModal(popupHowMany);
})

buttonStartClose.addEventListener('click', ()=>{
    closeModal(popupStart);
})
buttonHowManyClose.addEventListener('click', ()=> {
    closeModal(popupHowMany);
})