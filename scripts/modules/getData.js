const getData = async (data) => {
    const result = await fetch(data);
    const result2 = await result.json();
    return result2;
}

export const renderInfo = async (data) => {
    const result2 = await getData(data);
    const formReservation = document.querySelector('.reservation__form');
    const dates = formReservation.dates;
    const people = formReservation.people;
    const reservDate = document.querySelector('.reservation__data');
    const reservPrice = document.querySelector('.reservation__price');

    const addDate = result2.map(item => {
        const dateOption = document.createElement('option')
        dateOption.className = 'tour__option reservation__option';
        dateOption.value = item.date;
        dateOption.textContent = item.date;
        dates.appendChild(dateOption);
    });

    dates.addEventListener('change', () => {
        reservDate.textContent = '';
        reservPrice.textContent = '';
        const text1 = dates.value;

        const k = people.children;
        while (k.length > 1) {
            k[1].remove(); //очищаем select с количеством людей
        };

        const newObj = result2.filter(el => el.date == text1);

        let list = [];
        const lowEnd = newObj[0].min;
        const highEnd = newObj[0].max;
        for (let i = lowEnd; i <= highEnd; i++) {
            list.push(i);
        }

        for (let i = 0; i <= list.length - 1; i++) {
            const peopleOption = document.createElement('option');
            peopleOption.className = 'tour__option reservation__option';
            peopleOption.textContent = list[i];
            people.appendChild(peopleOption);
        };

        const price = newObj[0].price;
        console.log(price);

        people.addEventListener('change', () => {
            reservDate.textContent = '';
            const text2 = Number(people.value);

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

            const arr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

            const getMounth = (arr, item) => {
                const numberMonth = Number(item.substring(3, 5));
                const numberMonth2 = Number(item.substring(11, 13));
                const wordMonth = arr[numberMonth - 1];
                const wordMonth2 = arr[numberMonth2 - 1];
                return item.substring(0, 2) + ' ' + wordMonth + ' - ' + item.substring(8, 10) + ' ' + wordMonth2;
            };

            reservDate.insertAdjacentText('afterbegin', getMounth(arr, text1) + ', ');
            reservDate.insertAdjacentText('beforeend', text2 + ' ' + getNoun(text2, 'человек', 'человека', 'человек'));

            const reservPriceText =  `${Number(price) * text2}  &#8381;`;
            reservPrice.innerHTML = reservPriceText;
        });
    });
}


