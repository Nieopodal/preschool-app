const zoomInBtn = document.querySelector('#zoom-in-btn');
const zoomOutBtn = document.querySelector('#zoom-out-btn');

const zoomIn = () => {
  const textSize = document.getElementsByTagName('html')[0].classList;
  console.log(textSize[0]);
  if (textSize[0] === 'text-[150%]') {
    document.getElementsByTagName('html')[0].classList.remove('text-[150%]');
    document.getElementsByTagName('html')[0].classList.add('text-[200%]');
  }
  if (textSize[0] === 'text-[100%]') {
    document.getElementsByTagName('html')[0].classList.remove('text-[100%]');
    document.getElementsByTagName('html')[0].classList.add('text-[150%]');
  }
};

const zoomOut = () => {
  const textSize = document.getElementsByTagName('html')[0].classList;
  console.log(textSize[0]);
  if (textSize[0] === 'text-[150%]') {
    document.getElementsByTagName('html')[0].classList.remove('text-[150%]');
    document.getElementsByTagName('html')[0].classList.add('text-[100%]');
  }
  if (textSize[0] === 'text-[200%]') {
    document.getElementsByTagName('html')[0].classList.remove('text-[200%]');
    document.getElementsByTagName('html')[0].classList.add('text-[150%]');
  }
};

zoomInBtn.addEventListener('click', () => {
  zoomIn();
});

zoomOutBtn.addEventListener('click', () => {
  zoomOut();
});
