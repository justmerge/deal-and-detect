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

function isDeckCached() {
    const cachedCardsQuantity = getCachedCardsQuantity()

    updateLoader(cachedCardsQuantity);

    if (cachedCardsQuantity === DECK) {
        w.removeEventListener(CARD_READY, isDeckCached);
        removeLoader();
    }
}

function notifyCardReady() {
    const cardReady = new CustomEvent('cardReady');

    cachedImages++;
    w.dispatchEvent(cardReady);
}

export function cacheDeck(deck) {
    w.addEventListener(CARD_READY, isDeckCached);

    deck.forEach(card => {
        const cardImage = w.document.createElement('img');

        cardImage.onload = () => notifyCardReady();
        cardImage.src = card.image;
    });
}