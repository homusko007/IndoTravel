export const timer = (deadline) => {
    const timerCountDays = document.querySelector('.timer__count_days')
    const timerCountHours = document.querySelector('.timer__count_hours')
    const timerCountMinutes = document.querySelector('.timer__count_minutes')
    const timerWrapper = document.querySelector('.timer');
    timerWrapper.setAttribute('data-timer-deadline', deadline);

    const secondWrapper = document.createElement('p');
    secondWrapper.classList.add('timer__item', 'timer__item_minutes');
    const timerCountSeconds = document.createElement('span');
    timerCountSeconds.classList.add('timer__count');
    const secondWord = document.createElement('span');
    secondWord.classList.add('timer__units');
    secondWrapper.append(timerCountSeconds, secondWord);

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

