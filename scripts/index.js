import {timer} from './modules/timer.js';
import './modules/acc.js';
//import './modules/burger.js';


const button = document.querySelector('.header__menu-button');
const menuWrapper = document.querySelector('.header__menu');

button.addEventListener('click', () => {
    menuWrapper.classList.toggle('header__menu_active');
}) 

const init = () => {
    if (document.body.contains(document.querySelector("*[data-timer-deadline]"))) {
    timer('2022/09/02 10:22:00+0300');
    } 

    
}

init();
