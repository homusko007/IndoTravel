const button = document.querySelector('.header__menu-button');
const menu = document.querySelector('.header__menu');
const menuItem = document.querySelectorAll(".header__item");
const duration = 1000;
const distance = 100;

const right = 0;
menu.style.right = `${right}px`;

const menuToggle = () => {
    menu.classList.toggle('header__menu_active');
};

const startAnimation = (duration, callback) => {
    let startAnimation = NaN;

    requestAnimationFrame(function step(timestamp) {
        startAnimation ||= timestamp;

        const progress = (timestamp - startAnimation) / duration;

        callback(progress);
        if (progress < 1) {
            requestAnimationFrame(step)
        }
    });
};

button.addEventListener('click', () => {
    if (menu.classList.contains('header__menu_active')) {
        startAnimation(duration, (progress) => {
            const right2 = progress * right;
            menu.style.right = right2 + 'px';
        })
    } else {
        startAnimation(duration, (progress) => {
            const right3 = progress * distance;
            menu.style.right = right3 + 'px';
        }) 
    };
    menuToggle();
});

menuItem.forEach(item => {
    item.addEventListener("click", () => {
        if (menu.classList.contains('header__menu_active')) {
            menu.style.right = right;
            menuToggle();
        }
    });
});

document.addEventListener("click", function (e) {
    const target = e.target;
    if (target !== menu && target !== button &&
        menu.classList.contains('header__menu_active')) {
        menu.style.right = right;
        menuToggle();
    }
});


