const inputNewsTitle = document.querySelector('#input-news-title');
const titleCharCounterSpan = document.querySelector('#title-char-counter');

let numOfEnteredCharsToTitle;

const countCharsHandler = (input, counterSpan, min, max, numOfEnteredChars) => {
  numOfEnteredChars = input.value.length;
  counterSpan.textContent = numOfEnteredChars + `/${max}`;

  if (numOfEnteredChars < min || numOfEnteredChars > max) {
    counterSpan.classList.add('text-pink-400');
    counterSpan.classList.add('font-semibold');
  } else {
    counterSpan.classList.remove('text-pink-400');
    counterSpan.classList.remove('font-semibold');
    counterSpan.classList.add('text-gray-600');
  }
};

const countTitleHandler = () => {
  countCharsHandler(
    inputNewsTitle,
    titleCharCounterSpan,
    5,
    40,
    numOfEnteredCharsToTitle,
  );
};

inputNewsTitle.addEventListener('input', countTitleHandler);

window.addEventListener('load', countTitleHandler);
