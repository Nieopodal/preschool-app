const toggleMenuBtn = document.querySelector('#toggle-menu-btn');
const mainMenu = document.querySelector('#main-menu');
const mainMenuBtn = document.querySelector('#main-menu-btn');
const closeMainMenuBtn = document.querySelector('#close-main-menu-btn');
const dropdownNavbar = document.querySelector('#dropdownNavbar');

const toggleDisplayMenuHandler = () => {
  mainMenu.classList.toggle('hidden');
  mainMenuBtn.classList.toggle('hidden');
  closeMainMenuBtn.classList.toggle('hidden');
};

toggleMenuBtn.addEventListener('click', () => {
  if (dropdownNavbar) {
    dropdownNavbar.classList.toggle('hidden');
  }
});

mainMenuBtn.addEventListener('click', () => {
  toggleDisplayMenuHandler();
});

closeMainMenuBtn.addEventListener('click', () => {
  toggleDisplayMenuHandler();
});
