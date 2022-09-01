
export const timer = (deadline) => {

const timerTitle = document.createElement('p');
timerTitle.classList.add('timer__title') ;
timerTitle.textContent = 'До конца акции осталось:';   

    const dayWrapper = document.createElement('p');
    dayWrapper.classList.add('timer__item', 'timer__item_days');
    const timerCountDays = document.createElement('span');
    timerCountDays.classList.add('timer__count', 'timer__count_days');
    const daysWord = document.createElement('span');
    daysWord.classList.add('timer__units', 'timer__units_days');
    dayWrapper.append(timerCountDays, daysWord);

    const hourWrapper = document.createElement('p');
    hourWrapper.classList.add('timer__item', 'timer__item_hours');
    const timerCountHours = document.createElement('span');
    timerCountHours.classList.add('timer__count', 'timer__count_hours');
    const hoursWord = document.createElement('span');
    hoursWord.classList.add('timer__units', 'timer__units_hours');
    hourWrapper.append(timerCountHours, hoursWord);


    const minutesWrapper = document.createElement('p');
    minutesWrapper.classList.add('timer__item', 'timer__item_minutes');
    const timerCountMinutes = document.createElement('span');
    timerCountMinutes.classList.add('timer__count', 'timer__count_minutes');
    const minutesWord = document.createElement('span');
    minutesWord.classList.add('timer__units', 'timer__units_minutes');
    minutesWrapper.append(timerCountMinutes, minutesWord);

    const secondWrapper = document.createElement('p');
    secondWrapper.classList.add('timer__item', 'timer__item_minutes');
    const timerCountSeconds = document.createElement('span');
    timerCountSeconds.classList.add('timer__count');
    const secondWord = document.createElement('span');
    secondWord.classList.add('timer__units');
    secondWrapper.append(timerCountSeconds, secondWord);

    const timerWrapper = document.querySelector('.timer');
    timerWrapper.setAttribute('data-timer-deadline', deadline);

    timerWrapper.append(timerTitle, dayWrapper, hourWrapper, minutesWrapper);


    const getTimeRemaining = () => {
        const dateStop = new Date(deadline).getTime();
        const dateNow = Date.now();
        const timeRemaining = dateStop - dateNow;

        const seconds = Math.floor(timeRemaining / 1000 % 60);
        const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
        const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
        const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

        return { timeRemaining, seconds, minutes, hours, days }
    };

    const start = () => {
        const timer = getTimeRemaining();

        const getNoun = (number, one, two, five) => {
            let n = Math.abs(number);
            n %= 100;
            if (n >= 5 && n <= 20) {
                return five;
            }
            n %= 10;
            if (n === 1) {
                return one;
            }
            if (n >= 2 && n <= 4) {
                return two;
            }
            return five;
        };

        timerCountDays.textContent = timer.days;
        timerCountDays.nextElementSibling.textContent = getNoun(timer.days, 'день', 'дня', 'дней');
        timerCountHours.textContent = timer.hours;
        timerCountHours.nextElementSibling.textContent = getNoun(timer.hours, 'час', 'часа', 'часов');
        timerCountMinutes.textContent = timer.minutes;
        timerCountMinutes.nextElementSibling.textContent = getNoun(timer.minutes, 'минута', 'минуты', 'минут');
        timerCountSeconds.textContent = timer.seconds;
        timerCountSeconds.nextElementSibling.textContent = getNoun(timer.seconds, 'секунда', 'секунды', 'секунд');

        const intervalId = setTimeout(start, 1000 * 60);

        if (timer.timeRemaining <= 1000 * 60 * 60 * 24) {
            document.querySelector('.timer__item_days').style.display = "none";
            timerWrapper.append(secondWrapper);
            setTimeout(start, 1000);
        }
        if (timer.timeRemaining <= 0) {
            clearTimeout(intervalId);
            document.querySelector('.hero__text').style.display = "none";
            document.querySelector('.hero__timer').style.display = "none";
        }
    };

    start();
};

