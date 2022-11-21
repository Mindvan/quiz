import birdsData from './datafull.js';

const data = Object.values(birdsData[0])
const slider = document.getElementById('slider');
const welcome = document.querySelector('.welcome');
const welcomeContainer = document.querySelector('.welcome-container');
const arrows = document.querySelector('.arrows');
const main = document.querySelector('.main');

function loadAudio(audioFile) {
    var audioComment = new Audio();
    audioComment.src = `${audioFile}`;
    audioComment.load();
    return new Promise(function(resolve, reject) {
        audioComment.addEventListener("loadeddata", function() {
            resolve(audioComment.duration);
        });
    })
}

function secondsToMinutes(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}

async function generateAudio(audioFile) {
    const duration = await loadAudio(audioFile);
    // //console.log(duration);

    return new Promise(function(resolve, reject) {
        resolve(`<input type="range" class="bird__audio-duration" min="0" max="${Math.round(Number(duration))}" value="0">
                            <div class="bird__duration-time-count">
                                <div class="bird__duration-time-count_current">
                                    00:00
                                </div>
                                <div class="bird__duration-time-count_end">
                                    ${secondsToMinutes(Math.round(Number(duration)))}
                                </div>
                            </div>`);
    })
}
var seekbar;
var player;
async function generateNewModal(card) {
    // console.log(card);
    const generatedAudio = await generateAudio(card.audio);
    // console.log(generatedAudio);
    return `<div class="gallery-bird-block">
                <div class="comment-container-gallery">
                <img src="${card.image}" alt="bird" class="bird__image bird__image_comment">
                <div class="bird-info">
                    <div class="bird__title">
                        <div class="russian">${card.name}</div>
                        <div class="latin">${card.species}</div>
                    </div>
                    <div class="bird__audio">
                        <div class="bird__duration">
                               <button class="bird__button" id="button-2">
                                    <div class="bird_duration-icon bird_duration_icon-play"></div>
                                </button>
                                <div class="bird__duration-range">
                                    ${generatedAudio}
                                </div>
                            </div>
                            <span class="separator"></span>
                            <div class="bird__volume">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="volume-off" viewBox="0 0 16 16">
                                    <path d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
                                </svg>
                                <input type="range" id="bird__answer-volume" min="0" max="100" value="75" onchange="volume_change()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="volume-up" viewBox="0 0 16 16">
                                    <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                                    <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
                                </svg>
                                <div class="bird__answer-volume-count">
                                    75
                                </div>
                            </div>
                    </div>
                </div>
                <div class="bird-description">
                    <p>
                    ${card.description}
                    </p>
                </div>
            </div>
        </div>`;
}

function createCards() {
    welcome.style.flexDirection = 'column';
    welcome.style.overflow = 'hidden';
    welcome.style.justifyContent = 'start';
    welcomeContainer.style.justifyContent = 'start';
    welcomeContainer.style.height = '285px';
    welcomeContainer.style.width = '100%';
    welcomeContainer.style.position = 'relative';
    welcomeContainer.style.top = '0px';
    arrows.style.display = 'flex';
    arrows.style.flexDirection = 'column';
    arrows.style.justifyContent = 'space-between';
    arrows.style.alignItems = 'center';
    arrows.children[0].style.padding = '0.5em';
    arrows.children[1].style.padding = '0.5em';
    main.style.display = 'flex';
    main.style.justifyContent = 'start';
    data.forEach(async (x) => {
        const card = await generateNewModal(x);
        document.querySelector('.welcome-container').insertAdjacentHTML('beforeend', card);
       //document.querySelector('.welcome-container').innerHTML += await generateNewModal(x);
    });

    document.querySelector('.arrows').style.display = 'flex';

    setTimeout(function () {
        const durationButtons = document.querySelectorAll('.bird__button')
        console.log(durationButtons);
        durationButtons.forEach(x => x.addEventListener('click', listener));
    }, 2000)
}

async function makeAudio(currentCard) {
    const player = new Audio();
    player.src = currentCard.audio;
    return player;
}

var isAudioFinished = false;
var isLoaded = false;
const listener = (event) => {
    // берем кнопку, на которую нажали
    const target = event.target.closest('.bird__button');
    console.log(target);

    const targetNext = target.nextElementSibling;
    seekbar = targetNext.firstElementChild;

    const cardTitle = target.parentElement.parentElement.previousElementSibling.firstElementChild.textContent;
    data.filter(async (currentCard) => {
        if (currentCard.name === cardTitle) {
            player = await makeAudio(currentCard)
        }
    })
    // таймер для ползунка
    let timer = setInterval(range_slider, 1000);
    // в зависимости от кликнутого range работаем над нужным звуком

    console.log(target.lastElementChild.classList);

    if (!isLoaded) {
        setTimeout(function () {
            if (target.lastElementChild.classList.contains('bird_duration_icon-play')) {
                target.lastElementChild.classList.remove('bird_duration_icon-play')
                target.lastElementChild.classList.add('bird_duration_icon-pause')
                console.log(player);
                player.play();
            }
            isLoaded = true;
        }, 100)
    } else {
        console.log(isLoaded);
        if (target.lastElementChild.classList.contains('bird_duration_icon-play')) {
            target.lastElementChild.classList.remove('bird_duration_icon-play')
            target.lastElementChild.classList.add('bird_duration_icon-pause')
            console.log(player);
            player.play();
        }
        else {
            target.lastElementChild.classList.remove('bird_duration_icon-pause')
            target.lastElementChild.classList.add('bird_duration_icon-play')
            clearInterval(timer);
            player.pause();
            console.log(player.currentTime)
        }

        // // когда аудио закончилось
        // player.addEventListener("ended", function(){
        //     player.currentTime = 0;
        //     target.lastElementChild.classList.remove('bird_duration_icon-pause')
        //     target.lastElementChild.classList.add('bird_duration_icon-play')
        // });
    }

    const volumeRangeAnswer = document.querySelector('#bird__answer-volume');
    const volumeCountAnswer = document.querySelector('.bird__answer-volume-count');
    console.log(volumeRangeAnswer);
    console.log(volumeCountAnswer);

    volumeRangeAnswer.oninput = function(e) {
        console.log('oninput')
        console.log(e.target.value);
        player.volume = e.target.value / 100;
        volumeCountAnswer.innerHTML = volumeRangeAnswer.value;
        // oninput
    }

    volumeRangeAnswer.onchange = function(e) {
        console.log('onchange')
        console.log(e.target.value);
        player.volume = e.target.value / 100;
        volumeCountAnswer.innerHTML = volumeRangeAnswer.value;
        // onchange
    }

    seekbar.oninput = function(e) {
        setSeek(e.target.value);
        // oninput
    }

    seekbar.onchange = function(e) {
        setSeek(e.target.value);
        // onchange
    }
};

const leftArrow = document.querySelector('.arrows_left');
const rightArrow = document.querySelector('.arrows_right');

let offset = 0;
const moveRight = () => {
    offset = offset + 405;
    if (offset > 405 * (data.length - 1)) {
        offset = 0;
    }
    welcomeContainer.style.top = -offset + 'px';
}

const moveLeft = () => {
    offset = offset - 405;
    if (offset < 0) {
        offset = 405 * (data.length - 1);
    }
    welcomeContainer.style.top = -offset + 'px';
}

leftArrow.removeEventListener("click", moveLeft);
leftArrow.addEventListener("click", moveLeft);
rightArrow.removeEventListener("click", moveRight);
rightArrow.addEventListener("click", moveRight);


function showGallery() {
    if (!slider.firstElementChild) {
        welcomeContainer.innerHTML = '';
        welcome.classList.add('slider');
        createCards();
    }
}

function setSeek(value) {
    console.log(value);
    player.currentTime = value;
    timeUpdate();
}

function timeUpdate() {
    const durationCurrent = seekbar.nextElementSibling.firstElementChild;
    durationCurrent.innerHTML = secondsToMinutes(Math.round(player.currentTime));
    seekbar.value = Math.round(player.currentTime);

    if (Number(seekbar.value) === Math.round(player.duration)) {
        isAudioFinished = true;
    }
}

function range_slider() {
    let position = 0;
    if (!isNaN(player.duration)) {
        console.log(player.currentTime);
        position = player.currentTime;
        seekbar.value = position;
        timeUpdate();
    }
}

const links = document.querySelectorAll("[href='#gallery']");
links.forEach(x => x.removeEventListener('click', showGallery))
links.forEach(x => x.addEventListener('click', showGallery))

