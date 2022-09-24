//import { timer } from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';
import { getData } from './modules/getData.js';
import './modules/settingForm.js';

const init = () => {
    /*if (document.body.contains(document.querySelector("*[data-timer-deadline]"))) {
        timer('2022/09/07 10:22:00+0300');
    }*/
}

/*const form = document.querySelector('.reservation__form');
const formName = form.name;
formName.addEventListener('input', () => {
    formName.value = formName.value.replace(/[^а-яё ]/i, '');
}); 

form.tel.addEventListener('input', () =>{
    form.tel.value = form.tel.value.replace(/[^+\d]/i, '');
});*/

getData();
init();
