const btn = document.querySelector('.controls button'),
      cards = Array.from(document.querySelectorAll('.card')),
      cardsBack = Array.from(document.querySelectorAll('.card-back')),
      loader = document.querySelector('.loader'),
      loaderPerc = document.querySelector('.loader .percentage');

const CARDS_COUNT = 5,
    TOTAL_DECK = 52;

let cachedImagesNo = 0;

let FLIPPED = false;

const GAME_DECK = `https://deckofcardsapi.com/api/deck/new/draw/?count=${CARDS_COUNT}`,
    FULL_DECK = `https://deckofcardsapi.com/api/deck/new/draw/?count=${TOTAL_DECK}`;

const prepareCards = cardsSet => {
    return new Promise(resolve => {
        cardsSet.forEach((card, index) => {
            cardsBack[index].setAttribute('style', `background-image: url('${card.image}')`)
        });

        resolve();
    });
};

const doFlip = () => {
    return new Promise(resolve => {
        FLIPPED = !FLIPPED;

        cards.forEach((card, index) => {
            setTimeout(() => {
                const isFlipped = card.className.indexOf('flip') === -1;
        
                card.classList.toggle('flip', isFlipped);
                cardsBack[index].classList.toggle('flip', isFlipped);
                
                CARDS_COUNT === (index - 1) && resolve();
            }, (200 * index));
        });
    });
};

function needsCards() {
    return FLIPPED ? 
        Promise.resolve() : 
        requestCards(false).then(data => {
            if (data.success) {
                return prepareCards(data.cards);
            } else {
                throw new Error('The request has failed.')
            }
        });
}

function flipCards() {
    needsCards()
        .then(doFlip);
}

function requestCards(wholeDeck) {
    return fetch(!!wholeDeck ? FULL_DECK : GAME_DECK)
        .then(response => response.json());
}

function removeLoader() {
    loader.remove();
}

function notifyCardReady() {
    const cardReady = new CustomEvent('cardReady');

    cachedImagesNo++;

    window.dispatchEvent(cardReady);
}

function cacheCardImages({success, cards}) {
    if (success) {
        cards.forEach(card => {
            const imageToCache = document.createElement('img');

            imageToCache.classList.add('cache');
            imageToCache.onload = () => notifyCardReady();
            imageToCache.src = card.image;
        });
    } else {
        updateLoader('Failed to connect to API.');
    }
}

function cacheDeck() {
    requestCards(true)
        .then(cacheCardImages);
}

function updateLoader(msg) {
    if (typeof msg === 'string') {
        loader.innerText = msg;
    } else { 
        loaderPerc.innerText = parseInt((msg * 100 / TOTAL_DECK), 10);
    }
}

function isDeckReady() {
    updateLoader(cachedImagesNo);

    if (cachedImagesNo === TOTAL_DECK) {
        window.removeEventListener('cardReady', isDeckReady);
        removeLoader();
    }
}

window.addEventListener('cardReady', isDeckReady);
btn.addEventListener('click', flipCards);

cacheDeck();