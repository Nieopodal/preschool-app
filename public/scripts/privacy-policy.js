const privacyPolicyContainer = document.querySelector(
  '#privacy-policy-container',
);
const privacyPolicyBtn = document.querySelector('#privacy-policy-btn');

const displayCookie = () => {
  const displayNotice = localStorage.getItem('cookie-notice-displayed');
  if (displayNotice === 'true') {
    privacyPolicyContainer.classList.add('hidden');
  }
};

privacyPolicyBtn.addEventListener('click', () => {
  localStorage.setItem('cookie-notice-displayed', 'true');
  displayCookie();
});

displayCookie();
