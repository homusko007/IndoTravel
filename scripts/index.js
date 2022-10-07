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
new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1,
    autoplay: {
        delay: 3000,
    },
  
    navigation: {
    nextEl: '.album__right',
    prevEl: '.album__left',
    },

    breakpoints: {
        1022: {
            slidesPerView: 1,
        }
    }
  
});

getData();
init();
