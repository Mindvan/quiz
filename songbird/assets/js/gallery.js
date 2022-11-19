import birdsData from './data.js';
//import {loadAudio, generateAudio, generateNewModal} from './game.js';

const data = Object.values(birdsData[0])

const slider = document.getElementById('slider');
const welcome = document.querySelector('.welcome');
const welcomeContainer = document.querySelector('.welcome-container');

function generateNewModal(card) {

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
    welcomeContainer.style.justifyContent = 'start';
    welcomeContainer.style.height = '285px';
    welcomeContainer.style.width = '600px';
    welcomeContainer.style.position = 'relative';
    welcomeContainer.style.top = '0px';
    for (let dataItem of data) {
        welcomeContainer.innerHTML += generateNewModal(dataItem);
    }

    document.querySelector('.arrows').style.display = 'flex';
}

const leftArrow = document.querySelector('.arrows_left');
const rightArrow = document.querySelector('.arrows_right');

let offset = 0;
const moveRight = () => {
    offset = offset + 285;
    if (offset > 285 * (data.length - 1)) {
        offset = 0;
    }
    welcomeContainer.style.top = -offset + 'px';
    //welcomeContainer.classList.add("transition-right");

    // leftArrow.removeEventListener("click", moveLeft);
    // rightArrow.removeEventListener("click", moveRight);
    // leftArrow.style.pointerEvents = 'none';
    // rightArrow.style.pointerEvents = 'none';
}

const moveLeft = () => {
    offset = offset - 285;
    if (offset < 0) {
        offset = 285 * (data.length - 1);
    }
    welcomeContainer.style.top = -offset + 'px';
    //welcomeContainer.classList.add("transition-left");
    // leftArrow.removeEventListener("click", moveLeft);
    // rightArrow.removeEventListener("click", moveRight);
    // leftArrow.style.pointerEvents = 'none';
    // rightArrow.style.pointerEvents = 'none';
}

leftArrow.addEventListener("click", moveLeft);
rightArrow.addEventListener("click", moveRight);


function showGallery() {
    if (!slider.firstElementChild) {
        welcomeContainer.innerHTML = '';
        welcome.classList.add('slider');
        createCards();
    }
}

const links = document.querySelectorAll("[href='#gallery']");
links.forEach(x => x.addEventListener('click', showGallery))

