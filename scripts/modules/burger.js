const button = document.querySelector('.header__menu-button');
const menuWrapper = document.querySelector('.header__menu');

button.addEventListener('click', () => {
    menuWrapper.classList.toggle('header__menu_active');
}); 