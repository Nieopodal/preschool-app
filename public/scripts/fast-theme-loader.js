const fastThemeLoader = () => {
  const loadedTheme = localStorage.getItem('theme');
  const actualTheme = document.querySelector('html').getAttribute('data-theme');
  if (loadedTheme !== actualTheme)
    document.querySelector('html').setAttribute('data-theme', loadedTheme);
};

fastThemeLoader();
