
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

export function appendHandful(container, count) {
    for (let i = 1; i <= count; i++){
        const handful = createHandful(i, 0);
        container.append(handful);
    }
}

export function appendImage(container, count) {
    const handfulImageTemplate = document.querySelector('.handful-list__image-item-template').content;
    for (let i = 1; i<= count; i++){
        const handfulImageElement = handfulImageTemplate.querySelector('.handful-list__image-item').cloneNode(true);
        container.append(handfulImageElement);
    }
}

export function deleteItemsFromContainer(container) {
    const items = Array.from(container.querySelectorAll('li'));
    items.forEach((item) =>{
        item.remove();
    })
}

export function appendItems(handful, itemCount) {
    const handfulCount = handful.querySelector('.handful__count');
    const handfulImageList = handful.querySelector('.handful-list__image');
    handfulCount.textContent = `${itemCount} шт.`;
    appendImage(handfulImageList, itemCount);
}

export function unchekedAllHandful(handfuls){
    handfuls.forEach((item)=>{
        if(item.classList.contains('handful-checked')){
            item.classList.remove('handful-checked');
        }
    });
}

export function makeChecked(handful){
    handful.classList.add('handful-checked');
}