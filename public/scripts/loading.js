const form = document.querySelector('#login-form');
const loginBtn = document.querySelector('#login-btn');

form.addEventListener('submit', () => {
  loginBtn.setAttribute('disabled', 'disabled');
});
