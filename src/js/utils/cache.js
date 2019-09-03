import w from 'window';
import { DECK, EVENTS } from 'constants';
import { 
    updateLoader,
    removeLoader
} from 'Utils/dom';

const { CARD_READY } = EVENTS;

let cachedImages = 0;

function isDeckCached(deckSize = DECK) {
    updateLoader(cachedImages, deckSize);

    if (cachedImages === deckSize) {
        w.removeEventListener(CARD_READY, isDeckCached);
        removeLoader();
    }
}

function notifyCardReady() {
    cachedImages++;
    w.dispatchEvent(new CustomEvent(CARD_READY));
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