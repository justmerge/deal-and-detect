import w from 'window';
import { 
    updateLoader,
    removeLoader
} from 'Utils/dom';
import { DECK, EVENTS } from 'constants';

const { CARD_READY } = EVENTS;

let cachedImages = 0;

function getCachedCardsQuantity() {
    return cachedImages;
}

function isDeckCached(deckSize = DECK) {
    const cachedCardsQuantity = getCachedCardsQuantity()

    updateLoader(cachedCardsQuantity, deckSize);

    if (cachedCardsQuantity === deckSize) {
        w.removeEventListener(CARD_READY, isDeckCached);
        removeLoader();
    }
}

function notifyCardReady() {
    const cardReady = new CustomEvent(CARD_READY);

    cachedImages++;
    w.dispatchEvent(cardReady);
}

export function cacheDeck(deck) {
    const deckSize = deck.length; 

    w.addEventListener(CARD_READY, isDeckCached.bind(null, deckSize));

    deck.forEach(card => {
        const cardImage = w.document.createElement('img');

        cardImage.onload = () => notifyCardReady();
        cardImage.src = card.image;
    });
}