const fly = document.createElement('div');
const docEl = document.documentElement;
let lastScroll = 0;

fly.style.cssText = `
        position: fixed;
        width: 50px;
        height: 50px;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background: url('img/airplane.svg') center/contain;
        `;

window.addEventListener('resize', () => {
    if (docEl.clientWidth < 758) {
      fly.style.display = 'none';
    } else {
        fly.style.cssText = `
        position: fixed;
        width: 50px;
        height: 50px;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background: url('img/airplane.svg') center/contain;
        `;
    }
});

document.body.append(fly);

const calcPositionFly = () => {
    
    const maxTop = docEl.clientHeight - fly.clientHeight;
    const maxScroll = docEl.scrollHeight - docEl.clientHeight;
    const percentScroll = (window.pageYOffset * 100) / maxScroll;

    const top = maxTop * (percentScroll / 100);

    fly.style.bottom = top + 'px';

    direction();
};

const direction = () => {
  if(window.pageYOffset < lastScroll) {
    fly.style.transform = 'rotate(180deg)';
  } else {
    fly.style.transform = 'rotate(0deg)';
}
lastScroll = window.pageYOffset;
}

window.addEventListener('scroll', calcPositionFly);

calcPositionFly();
