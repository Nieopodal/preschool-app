const photoCardList = document.querySelectorAll('.one-photo');
const allPhotosList = document.querySelectorAll('.photo-img');
const closeBtn = document.querySelector('#close-btn');
const sliderTitle = document.querySelector('#slider-title');
const sliderContainer = document.querySelector('#slider-container');
const sliderPhoto = document.querySelector('#slider-photo');
const prevPhotoBtn = document.querySelector('#prev-photo-btn');
const nextPhotoBtn = document.querySelector('#next-photo-btn');

const body = document.body;
let actualIndex;

const cleanUpSliderHandler = () => {
  const oldPhoto = sliderContainer.querySelector('.one-image');
  const oldDescription = sliderTitle.querySelector('.description');
  if (oldPhoto) {
    sliderPhoto.removeChild(oldPhoto);
  }
  if (oldDescription) {
    sliderTitle.removeChild(oldDescription);
  }
};

const closeSliderHandler = () => {
  sliderContainer.classList.toggle('hidden');
  body.classList.toggle('overflow-hidden');
  cleanUpSliderHandler();
};

const openSliderHandler = () => {
  sliderContainer.classList.toggle('hidden');
  body.classList.toggle('overflow-hidden');
};

const loadContentToSlider = () => {
  const foundPhotoCard = photoCardList[actualIndex];

  if (foundPhotoCard) {
    const cardCopy = foundPhotoCard.cloneNode(true);
    const img = cardCopy.querySelector('.photo-img');
    const photoDescription = cardCopy.querySelector('#photo-description');
    const titleSpan = photoDescription.querySelector('.title-span');
    const createdAtSpan = photoDescription.querySelector('.createdAt-span');

    photoDescription.classList.remove(
      'p-4',
      'hover:text-pink-400',
      'leading-none',
      'hidden',
    );
    photoDescription.classList.add('description', 'p-2', 'sm:p-2');
    titleSpan.classList =
      'title-span font-bold pt-4 md:py-4 text-base md:text-xl leading-none md:leading-normal';
    createdAtSpan.classList = 'text-sm md:text-base block pt-2';
    img.className = `one-image object-scale-down h-[100%]`;

    sliderTitle.appendChild(photoDescription);
    sliderPhoto.appendChild(img);

    if (actualIndex < photoCardList.length - 1) {
      nextPhotoBtn.classList.remove('text-gray-700');
      nextPhotoBtn.removeAttribute('disabled');
      nextPhotoBtn.onclick = () => {
        actualIndex += 1;
        sliderPhoto.replaceChildren();
        cleanUpSliderHandler();
        loadContentToSlider(actualIndex);
      };
    } else {
      nextPhotoBtn.classList.add('text-gray-700');
      nextPhotoBtn.setAttribute('disabled', 'true');
    }

    if (actualIndex > 0) {
      prevPhotoBtn.classList.remove('text-gray-700');
      prevPhotoBtn.removeAttribute('disabled');
      prevPhotoBtn.onclick = () => {
        actualIndex -= 1;
        sliderPhoto.replaceChildren();
        cleanUpSliderHandler();
        loadContentToSlider(actualIndex);
      };
    } else {
      prevPhotoBtn.classList.add('text-gray-700');
      prevPhotoBtn.setAttribute('disabled', 'true');
    }
  }
};

allPhotosList.forEach((photo, i) => {
  photo.addEventListener('click', () => {
    actualIndex = i;
    openSliderHandler();
    loadContentToSlider(actualIndex);
  });
});

closeBtn.addEventListener('click', () => {
  closeSliderHandler();
});
