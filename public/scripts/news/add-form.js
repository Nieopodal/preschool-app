const inputNewsTitle = document.querySelector('#input-news-title');
const inputNewsArticle = document.querySelector('#input-news-article');
const titleCharCounterSpan = document.querySelector('#title-char-counter');
const articleCharCounterSpan = document.querySelector('#article-char-counter');

let numOfEnteredCharsToTitle;
let numOfEnteredCharsToArticle;

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
    60,
    numOfEnteredCharsToTitle,
  );
};

const countArticleHandler = () => {
  countCharsHandler(
    inputNewsArticle,
    articleCharCounterSpan,
    10,
    5000,
    numOfEnteredCharsToArticle,
  );
};

inputNewsTitle.addEventListener('input', countTitleHandler);
inputNewsArticle.addEventListener('input', countArticleHandler);

window.addEventListener('load', () => {
  countTitleHandler();
  countArticleHandler();
});
