

export function addHistoryMessage(historyContainer, messageId, handfulActive, value, who) {
    const historyItemTemplate = document.querySelector('.history-item-template').content;
    const historyItemElement = historyItemTemplate.querySelector('.history-item').cloneNode(true);
    const handfulNumber = handfulActive.querySelector('.handful__number').textContent;
    historyItemElement.textContent = `${messageId}. ${who} взял ${value} шт. из кучки №${handfulNumber}`
    historyContainer.prepend(historyItemElement);
}

export function addErrorMessage(historyContainer, handful, flag) {
    const historyItemTemplate = document.querySelector('.history-item-template').content;
    const historyItemElement = historyItemTemplate.querySelector('.history-item').cloneNode(true);

    if (flag === 2) {
        historyItemElement.classList.add('message-error');
        historyItemElement.textContent = `Похоже, что кучек нет`;
        historyContainer.prepend(historyItemElement);
        return;
    }



    const handfulNumber = handful.querySelector('.handful__number').textContent;
    if (flag === 1){
        historyItemElement.classList.add('message-good');
        historyItemElement.textContent = `Из кучки №${handfulNumber} забрали всё`;
        historyContainer.prepend(historyItemElement);
        return;
    }

    if (handful) {
        historyItemElement.classList.add('message-error');
        historyItemElement.textContent = 'В кучке меньше предметов';
        historyContainer.prepend(historyItemElement);
    } else {
        historyItemElement.classList.add('message-info');
        historyItemElement.textContent = 'Выберете кучку';
        historyContainer.prepend(historyItemElement);
    }

}