import { openModalInfo, openModalSucces, openModalError } from './createFormMessage.js';

const fetchRequest = async (url, {
    method = 'get',
    callback,
    body,
    headers,
}) => {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        }

        if (body) options.body = JSON.stringify(body);

        const response = await fetch(url, options);

        if (response.ok) {
            const data = await response.json();
            if (callback) callback(null, data);
            return;
        }
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);

    } catch (err) {
        callback(err);
    }
};

export const getData = () => {
    fetchRequest('data.json', {
        method: 'get',
        callback: renderInfo,
    });
};

const formReservation = document.querySelector('.reservation__form');

const renderInfo = (err, data) => {
    if (err) {
        formReservation.textContent = err;
        return;
    }
    const dates = formReservation.dates;
    const people = formReservation.people;
    const reservDate = document.querySelector('.reservation__data');
    const reservPrice = document.querySelector('.reservation__price');

    const addDate = data.map(item => {
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

        const newObj = data.filter(el => el.date == text1);

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

            const reservPriceText = `${Number(price) * text2}  &#8381;`;
            reservPrice.innerHTML = reservPriceText;

        });
    });
};

formReservation.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!formReservation.name.value.match(/^.+\s.+\s.+\s?$/g)) {
        formReservation.name.value = 'Заполните ФИО';
    } else {
        const formData = new FormData(formReservation);
        const newOrder = Object.fromEntries(formData);
        newOrder['total'] = document.querySelector('.reservation__price').textContent;
        const checkOrder = await openModalInfo(newOrder);
        if (checkOrder) {
            fetchRequest('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: {
                    dates: formReservation.dates.value,
                    people: formReservation.people.value,
                    title: formReservation.name.value,
                    tel: formReservation.tel.value,
                },
                callback(err, data) {
                    if (err) {
                        console.log(err, data);
                        openModalError();

                    } else {
                        openModalSucces();
                    }
                },
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            formReservation.reset();
            document.querySelector('.reservation__data').textContent = "";
            document.querySelector('.reservation__price').textContent = "";

            const inputs = formReservation.querySelectorAll('*[name]');
            inputs.forEach(el => {
                el.setAttribute('disabled', 'disabled');
            });
        }
    }
});

const footerForm = document.querySelector('.footer__form');

footerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetchRequest('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: {
            email: footerForm.email.value,
        },
        headers: { 'Content-Type': 'applicstion/json' },
        callback(err, data) {
            if (err) {
                console.log(err, data);
                footerForm.textContent = err;
            } else {
                footerForm.textContent = ''
                const message = document.createElement('p');
                message.classList.add('footer__form-title');
                message.textContent = 'Ваша заявка успешно отправлена';

                const message2 = document.createElement('p');
                message2.classList.add('footer__text');
                message2.textContent = 'Наши менеджеры свяжутся с вами в течении 3-х дней';
                message2.style.border = "3px solid red";
                footerForm.append(message, message2);
            }
        },
    });
});  
