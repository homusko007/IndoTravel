const form = document.querySelector('.reservation__form');
const formName = form.name;
formName.addEventListener('input', () => {
    formName.value = formName.value.replace(/[^а-яё ]/i, '');
}); 

form.tel.addEventListener('input', () =>{
    form.tel.value = form.tel.value.replace(/[^+\d]/i, '');
});