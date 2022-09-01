const items = document.querySelectorAll('.travel__item');
const buttons = document.querySelectorAll('.travel__item-title');
const textWrapper = document.querySelectorAll('.travel__item-text-wrapper');

let heightWrapper = 0;

textWrapper.forEach(elem => {
    if(heightWrapper < elem.scrollHeight) {
        heightWrapper = elem.scrollHeight;
    }
});

buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        for(let i = 0; i < items.length; i += 1) {
            if (index === i) {
                textWrapper[i].style.hight = 
                items[i].classList.contains('travel__item_active') ? 
                '' : `${textWrapper[i].scrollHeight}px`;
                items[i].classList.toggle('travel__item_active');
            } else {
                items[i].classList.remove('travel__item_active');  
                textWrapper[i].style.height = '';
            }
        };
    });
});