const zoomInBtn = document.querySelector('#zoom-in-btn');
const zoomOutBtn = document.querySelector('#zoom-out-btn');

const changeFontSize = (increase) => {
  const html = document.querySelector('html');
  const actualTextSize = html.classList;

  if (actualTextSize[0] === 'text-[150%]') {
    const newValue = increase ? 'text-[200%]' : 'text-[100%]';
    html.classList.remove('text-[150%]');
    html.classList.add(newValue);
    localStorage.setItem('text-size', newValue);
  }
  if (increase && actualTextSize[0] === 'text-[100%]') {
    html.classList.remove('text-[100%]');
    html.classList.add('text-[150%]');
    localStorage.setItem('text-size', 'text-[150%]');
  }
  if (!increase && actualTextSize[0] === 'text-[200%]') {
    html.classList.remove('text-[200%]');
    html.classList.add('text-[150%]');
    localStorage.setItem('text-size', 'text-[150%]');
  }
};

const getTextSizeFromLocalStorage = () => {
  const textSizeFromLocalStorage = localStorage.getItem('text-size');
  const html = document.querySelector('html');
  const actualTextSize = html.classList[0];

  if (textSizeFromLocalStorage === actualTextSize) return;

  switch (textSizeFromLocalStorage) {
    case 'text-[100%]': {
      html.classList.remove(actualTextSize);
      html.classList.add('text-[100%]');
      break;
    }
    case 'text-[150%]': {
      html.classList.remove(actualTextSize);
      html.classList.add('text-[150%]');
      break;
    }
    case 'text-[200%]': {
      html.classList.remove(actualTextSize);
      html.classList.add('text-[200%]');
      break;
    }
    default:
      return;
  }
};

zoomInBtn.addEventListener('click', () => {
  changeFontSize(true);
});

zoomOutBtn.addEventListener('click', () => {
  changeFontSize(false);
});

getTextSizeFromLocalStorage();
