const birdsData = [
    [
        {
            id: 1,
            name: 'Ворон',
            species: 'Corvus corax',
            description: 'Ворон – крупная птица. Длина тела достигает 70 сантиметров, размах крыльев – до полутора метров. Вороны населяют окрестности Тауэра. В Англии бытует поверье, что в день, когда черные вороны улетят от Тауэра, монархия рухнет.',
            image: 'https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg',
            audio: 'https://www.xeno-canto.org/sounds/uploaded/XIQVMQVUPP/XC518684-Grands%20corbeaux%2009012020%20Suzon.mp3'
        },
        {
            id: 2,
            name: 'Журавль',
            species: 'Grus grus',
            description: 'Звуки, издаваемые журавлем, похожи на звонкое «кур-лы – кур-лы». Журавли чаще всего поют дуэтом – одна птица начинает запев со слога «кур», а вторая подхватывает «лы». Если птица поёт одна, то она издает только звук «кур».',
            image: 'https://live.staticflickr.com/65535/49221158846_b0b69a58f1.jpg',
            audio: 'https://www.xeno-canto.org/sounds/uploaded/BLMSIUFTFU/XC512582-190604_1087_Grus_tok.mp3'
        },
        {
            id: 3,
            name: 'Ласточка',
            species: 'Delichon urbicum',
            description: 'Для ласточек характерно негромкое щебетание. Песни ласточек не смолкают на протяжении всего лета. Исследователи различают у птиц до 6 щебечущих звуков: «вит», «ви-вит», «чивит», «чиривит» и т.п. Ласточки любят петь дуэтом.',
            image: 'https://live.staticflickr.com//65535//48539007512_5029d2a9a0.jpg',
            audio: 'https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC489247-190724_09.10h_huiszwaluw_biesbosch_amaliahoeve_roep_100%2Bex_fouragerend_gezien_%20%282%29.mp3'
        },
        {
            id: 4,
            name: 'Козодой',
            species: 'Caprimulgus europaeus',
            description: 'Козодой – неприметная птица, известная благодаря своему голосу. Песня козодоя звучит как монотонная трель похожая на тарахтение мотоцикла. Такое дребезжание слышно от заката до рассвета, его тональность, частота и громкость изменяются. ',
            image: 'https://live.staticflickr.com/65535/48456345286_dbc8530027.jpg',
            audio: 'https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC486956-190623_22.37h_nachtzwaluw_rechte%20heide_zang_ad%20_2ex_gezien_.mp3'
        },
        {
            id: 5,
            name: 'Кукушка',
            species: 'Cuculus canorus',
            description: 'Кукушку назвали так из-за особенностей ее песен. Звонкое «ку-ку» не спутать ни с какой другой птицей. Кукушки не строят гнезда, их потомство выращивают другие виды пернатых, которым кукушки подбрасывают свои яйца.',
            image: 'https://live.staticflickr.com/65535/48377838151_e15f430ec1.jpg',
            audio: 'https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC501461-190616_08.13h_koekoek_brabantse%20biesbosch%20jantjesplaat_roep_1%20ex_ad%20m_ter%20plaatse%20zingend_gezien_.mp3'
        },
        {
            id: 6,
            name: 'Синица',
            species: 'Parus major',
            description: 'В щебетании синиц различают более 40 различных звуковых сочетаний. Поют они практически круглый год, немного затихая только зимой. Синицы настоящие санитары леса. Одна пара синиц в период гнездования оберегает от вредителей десятки деревьев.',
            image: 'https://live.staticflickr.com//65535//49366042493_c48c81d58d.jpg',
            audio: 'https://www.xeno-canto.org/sounds/uploaded/RFGQDPLDEC/XC518417-Kj%C3%B8ttmeis%20XC%20Helg%C3%B8ya%20Elias%20A.%20Ryberg20200108133922_079.mp3'
        }
    ]
];

// export default birdsData;

// получаем данные
const data = Object.values(birdsData[0])

const lvl1 = document.querySelector('.levels__item:first-child');
lvl1.style.borderBottom = '2px solid #be3cf6';
lvl1.style.color = '#be3cf6';
lvl1.style.textShadow = 'rgba(252,0,252,1) 0px 0px 12px';

// имя птицы
const title = document.querySelector('.bird__title');
title.innerHTML = data[0].name.replace(/[^a-z0-9]/gi, '*');

// аудио
let audio = new Audio(`${data[0].audio}`);
audio.preload = 'metadata';
audio.load();

const durationCurrent = document.querySelector('.bird__duration-time-count_current');
var player;

function setSeek(value) {
    //console.log('seek');
    player.currentTime = value;
    //console.log(player.currentTime);
    timeUpdate();
}

var seekbar;
var isAudioFinished = false;

function timeUpdate() {
    //console.log('timeUpdate');
    const durationCurrent = seekbar.nextElementSibling.firstElementChild;
    durationCurrent.innerHTML = secondsToMinutes(Math.round(player.currentTime));
    ////console.log(seekbar);
    //const value = seekbar.nextElementSibling.firstElementChild;
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
//

var index = 0;
document.querySelectorAll('.answers-item').forEach(x => {
    x.innerHTML = data[index].name;
    index++;
})

document.querySelector('.next').addEventListener('click', function() {
    //console.log('heh');
    window.location.href = 'results.html';
})

var htmlAudio = '';
var isLoaded = false;

var audioComment = new Audio();
function loadAudio(audioFile) {
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

async function generateNewModal(card) {
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
        // //console.log(durationButtons[0]);
        const range = durationButtons[0].nextElementSibling;
        const durationEnd = range.lastElementChild.lastElementChild;
        //console.log(durationEnd);
        //console.log(audio.duration);
        range.firstElementChild.max = Math.round(audio.duration);
        //console.log(range.firstElementChild.max);
        durationEnd.innerHTML = secondsToMinutes(range.firstElementChild.max);
        // await shit(durationButtons);
    };
}

async function targetCard(event) {
    let card = event.target.closest('.answers-item');

    if (card) {
        let cardName = card.textContent.toString();
        console.log(cardName);
        data.filter(async (currentCard) => {
            if (currentCard.name === cardName) {
                document.querySelector('.comment').style.display = 'block';
                document.querySelector('.comment').innerHTML = await generateNewModal(currentCard);
                durationButtons = document.querySelectorAll('.bird__button');
                play(durationButtons);
            }
        })
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
        } else {;
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


