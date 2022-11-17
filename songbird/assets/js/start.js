const aboutHeader = document.querySelector('#header__item-about');
const startHeader = document.querySelector('#header__item-start');
const startButton = document.querySelector('.welcome__start');

aboutHeader.addEventListener('click', function() {
    window.location.href = 'start.html';
})

startHeader.addEventListener('click', function() {
    window.location.href = 'lvl1.html';
})

startButton.addEventListener('click', function() {
    window.location.href = 'lvl1.html';
})

const body = document.querySelector('body');
const loading = document.createElement('div');
loading.className = 'loading';
const header = document.querySelector('header');
var insertedElement = body.insertBefore(loading, header);

loading.addEventListener('animationend', function() {
    loading.remove();
})
