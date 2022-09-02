const button = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');
const menuItem = document.querySelectorAll(".header__item");

const menuToggle = () => {
    menu.classList.toggle('header__menu_active');
};

button.addEventListener('click', () => {
    menuToggle();
}); 

menuItem.forEach(item => {
    item.addEventListener("click", () => {
        if(menu.classList.contains('header__menu_active')) {
            menuToggle();
        } 
    });
});

document.addEventListener("click", function (e) {
    const target = e.target;
    if (target !== menu && target !== button && 
        menu.classList.contains('header__menu_active')) {
        menuToggle();
    }
});