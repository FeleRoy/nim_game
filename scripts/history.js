

export function addHistoryMessage(historyContainer, messageId, handfulActive, value, who) {
    const historyItemTemplate = document.querySelector('.history-item-template').content;
    const historyItemElement = historyItemTemplate.querySelector('.history-item').cloneNode(true);
    const handfulNumber = handfulActive.querySelector('.handful__number').textContent;
    historyItemElement.textContent = `${messageId}. ${who} взял ${value} шт. из кучки №${handfulNumber}`
    historyContainer.append(historyItemElement);
}