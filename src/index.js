import './styles/index.css'
import { openModal, closeModal, closeByEsc, closeByOverlay } from "../scripts/modal";

const popupStart = document.querySelector('.popup_type-start');
const buttonStart = document.querySelector('.button_type-start');

buttonStart.addEventListener('click', ()=> {
    openModal(popupStart);
});