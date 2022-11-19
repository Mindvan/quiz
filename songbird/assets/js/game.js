import birdsData from './data.js';

const data = Object.values(birdsData[0])
var player;
var points = 5;
var total = 0;
var lvlCount = 1;

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


const volumeRange = document.querySelector('#bird__audio-volume');
const volumeCount = document.querySelector('.bird__duration-volume-count');
audio.volume = volumeRange.value / 100;

// изменение громкости
volumeRange.oninput = function(e) {
    volume_change(e.target.value);
    // oninput
}

volumeRange.onchange = function(e) {;
    volume_change(e.target.value);
    // onchange
}

function volume_change(value) {
    audio.volume = value / 100;
    volumeCount.innerHTML = volumeRange.value;
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
                </div>
            </div>
            <div class="bird-description">
                <p>
                ${card.description}
                </p>
            </div>
        </div>`;
}


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
        audioYes.play();
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

function play(durationButtons) {
    // вешаем события на оба range'а
    durationButtons.forEach(x => x.addEventListener('click', function(event) {

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
    }));
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


