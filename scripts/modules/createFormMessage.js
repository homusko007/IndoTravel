export const openModalSucces = () => {
     const overlaySucces = document.createElement('div');
    overlaySucces.classList.add('overlay-form-success'); 
    
    overlaySucces.insertAdjacentHTML('beforeend', `
    <div class="form-success-wrapper">
        <div class="form-success-title">Ваша заявка успешно отправлена</div>
        <div class="form-success-message">Наши менеджеры свяжутся с вами в течении 3-х рабочих дней</div>
        <div class="form-success-btn"></div>
    </div>`);
   document.body.append(overlaySucces);
}

export const openModalError = () => {
    const overlayError = document.createElement('div');
    overlayError.classList.add('overlay-form-success'); 
        overlayError.insertAdjacentHTML('beforeend', `
    <div class="form-success-wrapper">
        <div class="form-success-title">Упс... Что-то пошло не так</div>
        <div class="form-success-message">Не удалось отправить заявку. Пожалуйста, повторите отправку еще раз</div>
        <button class="button reservation__button form-error-btn">Забронировать</button>
    </div>`);
   document.body.append(overlayError);

}


export const closeModal = () => {
const overlay = document.querySelector('.overlay-form-success') 
overlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlay ||
        target.classList.contains('form-success-btn') || 
        target.classList.contains('form-error-btn')) {
            overlay.classList.add('hidden');
            
    }
});
};