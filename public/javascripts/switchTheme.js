var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
});

var darkMode = document.getElementById('darkMode').children[0];
var darkModeBtn = document.getElementById('darkMode');

window.addEventListener('load', function () {
  if (darkModeBtn) {
    initTheme();
  }
  darkModeBtn.addEventListener('click', resetTheme)
});

function initTheme() {
  var darkThemeSelected = localStorage.getItem('darkMode') !== null && localStorage.getItem('darkMode') === 'dark';
  darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
  if (darkThemeSelected) darkMode.classList.replace("fa-moon-o", "fa-sun-o");
}

function resetTheme() {
    if (darkMode.classList[1] == "fa-moon-o") {
        localStorage.setItem('darkMode', 'dark');
        document.body.setAttribute('data-theme', 'dark');
        
        darkMode.classList.replace("fa-moon-o", "fa-sun-o");
    } else {
        localStorage.removeItem('darkMode');
        document.body.removeAttribute('data-theme');
        
        darkMode.classList.replace("fa-sun-o", "fa-moon-o");
    }
}