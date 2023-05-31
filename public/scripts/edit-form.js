const showDeletingFormBtn = document.querySelector('#show-deleting-form-btn');
const newsDeletingForm = document.querySelector('#news-deleting-form');
const cancelDeletingBtn = document.querySelector('#cancel-deleting');
const containerToBlurWhenDeleting = document.querySelector(
  '#container-to-blur-when-popup',
);
const containerBlockAllInputs = document.querySelector(
  '#container-block-all-input',
);

const toggleDisplayDeletingForm = () => {
  newsDeletingForm.classList.toggle('hidden');
  containerToBlurWhenDeleting.classList.toggle('blur-sm');
  containerBlockAllInputs.classList.toggle('hidden');
};

showDeletingFormBtn.addEventListener('click', toggleDisplayDeletingForm);
cancelDeletingBtn.addEventListener('click', toggleDisplayDeletingForm);
