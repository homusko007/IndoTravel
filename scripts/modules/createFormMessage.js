import { loadStyle } from './loadStyle.js';

export const openModalInfo = async (data) => {
    await loadStyle('css/modal.css');
    const overlay = document.createElement('div');
    const modalWindow = document.createElement('div');
    const title = document.createElement('div');
    const customerName = document.createElement('p');
    const customerTel = document.createElement('p');
    const date = document.createElement('p');
    const peopleCount = document.createElement('p');
    const total = document.createElement('p');
    const order =  document.createElement('button');
    const close =  document.createElement('button');

    overlay.classList.add('overlay'); 
    modalWindow.classList.add('modal_window'); 
    title.classList.add('form-success-title');
    title.textContent = 'Проверьте ваш заказ';
    customerName.classList.add('modal_info');
    customerName.textContent = `Ваше имя: ${data.name}`;
    customerTel.classList.add('modal_info');
    customerTel.textContent = `Ваш тел: ${data.tel}`;
    date.classList.add('modal_info');
    date.textContent = `Дата путешествия: ${data.dates}`;
    peopleCount.classList.add('modal_info');
    peopleCount.textContent = `Количество отдыхающих: ${data.people}`;
    total.classList.add('modal_info');
    total.textContent = `Итого стоимость: ${data.total}`;
    order.classList.add('button', 'form-error-btn');
    order.textContent = "Подтверждаю";
    close.classList.add('button', 'close');
    close.textContent = "Изменить данные";

    overlay.append(modalWindow);
    modalWindow.append(title, customerName, customerTel, date, peopleCount, total, order, close);
    
    document.body.append(overlay);

    return new Promise (resolve => {
    close.addEventListener('click', () => {
    overlay.remove();
    resolve(false);
    });
    order.addEventListener('click', () => {
    overlay.remove();
    resolve(true);
    });
});
}

export const openModalSucces = async () => {
    await loadStyle('css/modal.css');

    const overlaySucces = document.createElement('div');
    overlaySucces.classList.add('overlay');

    overlaySucces.insertAdjacentHTML('beforeend', `
    <div class="modal_window">
        <div class="form-success-title">Ваша заявка успешно отправлена</div>
        <div class="form-success-message">Наши менеджеры свяжутся с вами в течении 3-х рабочих дней</div>
        <div class="form-success-btn"></div>
    </div>`);
    document.body.append(overlaySucces);

    const btn = document.querySelector('.form-success-btn');
    btn.addEventListener('click', () => {
        overlaySucces.remove();
    });
};

export const openModalError = async () => {
    await loadStyle('css/modal.css');
    const overlayError = document.createElement('div');
    overlayError.classList.add('overlay');
    overlayError.insertAdjacentHTML('beforeend', `
    <div class="modal_window">
        <div class="form-success-title">Упс... Что-то пошло не так</div>
        <div class="form-success-message">Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз</div>
        <button class="button form-error-btn">Забронировать</button>
    </div>`);
    document.body.append(overlayError);

    const btn = document.querySelector('.form-error-btn');
    btn.addEventListener('click', () => {
        overlayError.remove();
    });
};