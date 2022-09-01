import {timer} from './modules/timer.js'

const init = () => {
    if (document.body.contains(document.querySelector("*[data-timer-deadline]"))) {
    timer('2022/09/02 10:22:00+0300');
    } 
}

init();
