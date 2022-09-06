import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';



const init = () => {
    if (document.body.contains(document.querySelector("*[data-timer-deadline]"))) {
    timer('2022/09/07 10:22:00+0300');
    } 
}

init();
