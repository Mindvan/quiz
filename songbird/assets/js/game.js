import birdsData from './data.js';

function visual() {

}

function overlay() {
    const overlay = document.querySelector('.overlay');
    overlay.textContent = 'Loading...';

    window.onload = function () {
        overlay.classList.add('disappear');
        overlay.addEventListener('animationend', function() {
            overlay.remove();
            console.log('loaded');
            visual();
        })
    }
}

overlay();


const data = Object.values(birdsData[0])
var player;
var points = 5;
var total = 0;
var lvlCount = 1;
var volume;

const lvls = document.querySelectorAll('.levels__item');
for (let k = 0; k < lvls.length; k++) {
    if (lvlCount === k + 1) {
        lvls[k].classList.add('levels__item_active');
    }
}

const title = document.querySelector('.bird__title');
const birdImage = document.querySelector('.bird__image');
const answerItems = document.querySelectorAll('.answers-item');
const pointsCounter = document.querySelector('#header-score__counter')
const comment = document.querySelector('.comment');
comment.innerHTML = 'Послушайте плеер. Выберите птицу из списка'

// получаем данные
function fill() {
    // имя птицы
    title.innerHTML = data[0].name.replace(/[^a-z0-9]/gi, '*');

    // изображение птицы
    birdImage.src = data[0].image;

    rndAnswers();
}

fill();

// аудио
let audio = new Audio(`${data[0].audio}`);
audio.preload = 'metadata';
audio.load();

function setSeek(value) {
    player.currentTime = value;
    timeUpdate();
}

var seekbar;
var isAudioFinished = false;

function timeUpdate() {
    const durationCurrent = seekbar.nextElementSibling.firstElementChild;
    durationCurrent.innerHTML = secondsToMinutes(Math.round(player.currentTime));
    seekbar.value = Math.round(player.currentTime);

    if (Number(seekbar.value) === Math.round(player.duration)) {
        isAudioFinished = true;
    }
}

// конвертация времени
function secondsToMinutes(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}


const volumeRange = document.querySelector('#bird__question-volume');
const volumeCount = document.querySelector('.bird__question-volume-count');
console.log(volumeRange);
console.log(volumeRange.value);
console.log(volumeCount);

function volume_change(value) {
    console.log(value);
    audio.volume = value / 100;
    volumeCount.innerHTML = volumeRange.value;
}

// изменение громкости
volumeRange.oninput = function(e) {
    console.log('oninput')
    volume_change(e.target.value);
    // oninput
}

volumeRange.onchange = function(e) {
    console.log('onchange')
    volume_change(e.target.value);
    // onchange
}

function rndAnswers() {
    var answerNames = [];
    for (let i = 0; i < data.length; i++) {
        answerNames[i] = data[i].name;
    }
    var answerNamesCheck = answerNames.slice(0);

    for (let j = 0; j < 6; j++) {
        let rnd = Math.floor((Math.random() * answerNamesCheck.length));
        answerItems[j].innerHTML = answerNamesCheck[Object.keys(answerNamesCheck)[rnd]];

        answerNamesCheck = answerNamesCheck.filter(obj => {
            return obj !== answerNamesCheck[Object.keys(answerNamesCheck)[rnd]];
        });
    }
}

document.querySelector('.next').addEventListener('click', function() {
    lvlCount++;
    console.log(lvlCount);
})

var audioComment = new Audio();
export function loadAudio(audioFile) {
    // var audioComment = new Audio(`${audioFile}`);
    audioComment.src = `${audioFile}`;
    // audioComment.preload = 'metadata';
    audioComment.load();
    return new Promise(function(resolve, reject) {
        audioComment.addEventListener("loadeddata", function() {
            resolve(audioComment.duration);
        });
    })
}

export async function generateAudio(audioFile) {
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

export async function generateNewModal(card) {
    const generatedAudio = await generateAudio(card.audio);

    return `<div class="comment-container">
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
        </div>`;
}

audio.volume = volumeRange.value / 100;
var durationButtons = document.querySelectorAll('.bird__button');

if (durationButtons.length === 1) {
    audio.onloadedmetadata = async function () {
        const range = durationButtons[0].nextElementSibling;
        const durationEnd = range.lastElementChild.lastElementChild;
        range.firstElementChild.max = Math.round(audio.duration);
        durationEnd.innerHTML = secondsToMinutes(range.firstElementChild.max);
        await play(durationButtons);
    };
}

async function targetCard(event) {
    if (comment.classList.contains('default')) {
        comment.classList.remove('default');
    }
    let card = event.target.closest('.answers-item');

    if (card) {
        let cardName = card.textContent.toString();
        console.log(cardName);
        data.filter(async (currentCard) => {
            if (currentCard.name === cardName) {
                document.querySelector('.comment').style.display = 'block';
                document.querySelector('.comment').innerHTML = await generateNewModal(currentCard);

                const volumeRangeAnswer = document.querySelector('#bird__answer-volume');
                const volumeCountAnswer = document.querySelector('.bird__answer-volume-count');

                volumeRangeAnswer.oninput = function(e) {
                    console.log('oninput')
                    console.log(e.target.value);
                    audioComment.volume = e.target.value / 100;
                    volumeCountAnswer.innerHTML = volumeRangeAnswer.value;
                    // oninput
                }

                volumeRangeAnswer.onchange = function(e) {
                    console.log('onchange')
                    console.log(e.target.value);
                    audioComment.volume = e.target.value / 100;
                    volumeCountAnswer.innerHTML = volumeRangeAnswer.value;
                    // onchange
                }

                durationButtons = document.querySelectorAll('.bird__button');

                if (!isAnswered) {
                    checkAnswer(card)
                }

                play(durationButtons);
            }
        })
    }
}

var isAnswered = false;
let audioYes = new Audio('../assets/sfx/correct.mp3');
let audioNo = new Audio('../assets/sfx/wrong.mp3');
function checkAnswer(card) {
    if (data[0].name === card.textContent.toString()) {
        card.style.boxShadow = 'inset 0 0 0 2px #60ff00';
        console.log('correct');
        title.innerHTML = data[0].name;
        isAnswered = true;
        total = points;
        localStorage.setItem('total', `${total}`);
        pointsCounter.innerHTML = `${localStorage.getItem('total')}`;
        document.querySelector('.next').style.pointerEvents = 'auto';
        document.querySelector('.next').classList.add('next-active');
        audioYes.play();
        stopPlay();
    } else {
        if (!isAnswered && !card.classList.contains('wrong'))
        {
            card.classList.add('wrong');
            points--;
            console.log(points);
            audioNo.play();
        }
        console.log('wrong')
    }
}

function stopPlay() {
    player.pause();
    durationButtons.forEach(x => {
        x.firstElementChild.classList.remove('bird_duration_icon-pause');
        x.firstElementChild.classList.add('bird_duration_icon-play');
    });
}

const listener = (event) => {
    // берем кнопку, на которую нажали
    const target = event.target.closest('.bird__button');

    const targetNext = target.nextElementSibling;
    seekbar = targetNext.firstElementChild;

    // таймер для ползунка
    let timer = setInterval(range_slider, 1000);

    // в зависимости от кликнутого range работаем над нужным звуком
    if (target.id === 'button-1') {
        player = audio;
    } else {
        player = audioComment;
    }

    console.log(target.lastElementChild.classList);

    // плей-паузка
    if (target.lastElementChild.classList.contains('bird_duration_icon-play')) {
        target.lastElementChild.classList.remove('bird_duration_icon-play')
        target.lastElementChild.classList.add('bird_duration_icon-pause')
        player.play();
    } else {
        target.lastElementChild.classList.remove('bird_duration_icon-pause')
        target.lastElementChild.classList.add('bird_duration_icon-play')
        clearInterval(timer);
        player.pause();
    }

    // когда аудио закончилось
    player.addEventListener("ended", function(){
        player.currentTime = 0;
        target.lastElementChild.classList.remove('bird_duration_icon-pause')
        target.lastElementChild.classList.add('bird_duration_icon-play')
    });

    seekbar.oninput = function(e) {
        setSeek(e.target.value);
        // oninput
    }

    seekbar.onchange = function(e) {
        setSeek(e.target.value);
        // onchange
    }
};

function play(durationButtons) {
    // вешаем события на оба range'а
    durationButtons.forEach(x => x.removeEventListener('click', listener));
    durationButtons.forEach(x => x.addEventListener('click', listener));
}

// событие на варианты ответа
const birdItem = document.querySelector('.answers-list')
birdItem.addEventListener('click', targetCard);

// движение ползунка
function range_slider() {
    let position = 0;
    if (!isNaN(player.duration)) {
        position = player.currentTime;
        seekbar.value = position;
        timeUpdate();
    }
}




