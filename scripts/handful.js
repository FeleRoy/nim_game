//функция создания кучки
export function createHandful(number, itemCount) {
    const handfulTemplate = document.querySelector('.handful-template').content;
    const handfulElement = handfulTemplate.querySelector('.handful').cloneNode(true);
    const handfulNumber = handfulElement.querySelector('.handful__number');
    const handfulCount = handfulElement.querySelector('.handful__count');
    const handfulImageList = handfulElement.querySelector('.handful-list__image');
    
    appendImage(handfulImageList, itemCount);
    handfulNumber.textContent = `${number}.`;
    handfulCount.textContent = `${itemCount} шт.`;


    return handfulElement;
}

//функция добавления кучек в контейнер
export function appendHandful(container, count) {
    for (let i = 1; i <= count; i++){
        const handful = createHandful(i, 0);
        container.append(handful);
    }
}

// функция добавления картинок в кучку
export function appendImage(container, count) {
    const handfulImageTemplate = document.querySelector('.handful-list__image-item-template').content;
    for (let i = 1; i<= count; i++){
        const handfulImageElement = handfulImageTemplate.querySelector('.handful-list__image-item').cloneNode(true);
        container.append(handfulImageElement);
    }
}

// функция удаления предметов из контейнера
export function deleteItemsFromContainer(container) {
    const items = Array.from(container.querySelectorAll('li'));
    items.forEach((item) =>{
        item.remove();
    })
}

// функция добавления предметов в кучку
export function appendItems(handful, itemCount) {
    const handfulCount = handful.querySelector('.handful__count');
    const handfulImageList = handful.querySelector('.handful-list__image');
    handfulCount.textContent = `${itemCount} шт.`;
    appendImage(handfulImageList, itemCount);
}

// функция снятия класса выбранной кучки
export function unchekedAllHandful(handfuls){
    handfuls.forEach((item)=>{
        if(item.classList.contains('handful-checked')){
            item.classList.remove('handful-checked');
        }
    });
}
// функция добавления класса выбранной кучке
export function makeChecked(handful){
    handful.classList.add('handful-checked');
}

// обработчик выбора кучки
export function handlerHandfulClick(evt, handfuls){
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
}
// функция убирания пустых кучек
export function clearEmptyHandfuls(handfulContainer){
    const items = Array.from(handfulContainer.querySelectorAll('.handful'));
    items.forEach((item) =>{
        const count = item.querySelector('.handful__count');
        if(count.textContent === '0 шт.'){
            item.remove();
        }
    })
}
// функция забирания предметов из кучки
export function takeItemsFromHandful(handful, count){
    const handfulCount = handful.querySelector('.handful__count');
    const handfulCountString = handfulCount.textContent.substring(0, 2);
    const handfulImageList = handful.querySelector('.handful-list__image');
    deleteItemsFromContainer(handfulImageList);
    handfulCount.textContent = `${String(Number(handfulCountString) - Number(count))} шт.`;
    appendImage(handfulImageList, Number(handfulCountString) - Number(count));
}

//функция проверки возможности взятия предметов из кучки
export function canITake(handful, value){
    if (handful){
    const handfulCount = handful.querySelector('.handful__count');
    const handfulCountString = handfulCount.textContent.substring(0, 2);
    if ((Number(handfulCountString) < Number(value))) {
        return false;
    } else {
        return true;
    }
    }
}
// проверка контейнера на пустоту 
export function containerIsEmpty(container){
    const items = Array.from(container.querySelectorAll('li'));
    if (items.length === 0) {
        return true;
    } else{
        return false;
    }
}