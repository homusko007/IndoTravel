const form = document.querySelector('.reservation__form');
const formName = form.name;


formName.addEventListener('input', () => {
    formName.value = formName.value.replace(/[^а-яё ]/i, '');
}); 

form.tel.addEventListener('input', () =>{
    form.tel.value = form.tel.value.replace(/[^+\d]/i, '');
});

const telMask = new Inputmask('+7 (999)-999-99-99');
const inputTel = document.getElementById('reservation__phone');
telMask.mask(inputTel);


const justValidate = new JustValidate('.reservation__form');
justValidate
.addField('.reservation__input_name', [
  {
    rule: 'required',
    errorMessage: 'Укажите ваше имя',
  },
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'Не короче 3 символов',
  },
  {
    rule: 'maxLength',
    value: 30,
    errorMessage: 'Слишком днинное',
  }
])
.addField('.reservation__input_phone', [
  {
    rule: 'required',
    errorMessage: 'Укажите ваш телефон',
  },
  {
    validator(value) {
      const phone = inputTel.inputmask.unmaskedvalue();
      return !!(Number(phone) && phone.length === 10);
    },
    errorMessage: 'Телефон не корректный'
  }
]);