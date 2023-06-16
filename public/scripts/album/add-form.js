const inputTitle = document.querySelector('#input-title');
const titleCharCounterSpan = document.querySelector('#title-char-counter');

let numOfEnteredCharsToTitle;

const countCharsHandler = (input, counterSpan, min, max, numOfEnteredChars) => {
  numOfEnteredChars = input.value.length;
  counterSpan.textContent = numOfEnteredChars + `/${max}`;

  if (numOfEnteredChars < min || numOfEnteredChars > max) {
    counterSpan.classList.add('text-secondary-focus');
    counterSpan.classList.add('font-semibold');
  } else {
    counterSpan.classList.remove('text-secondary-focus');
    counterSpan.classList.remove('font-semibold');
    counterSpan.classList.add('text-gray-600');
  }
};

const countTitleHandler = () => {
  countCharsHandler(
    inputTitle,
    titleCharCounterSpan,
    5,
    40,
    numOfEnteredCharsToTitle,
  );
};

inputTitle.addEventListener('input', countTitleHandler);

window.addEventListener('load', countTitleHandler);
