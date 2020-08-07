import w from 'window';
import { EVENTS } from 'constants';

const { CARD_READY } = EVENTS;

const BACK_FACE_IMAGE_URL = 'https://static.vecteezy.com/' +
    'system/resources/previews/000/396/130/large_2x/' +
    'vector-minimal-black-and-gold-geometric-pattern.jpg';

let cachedCards = 0;

function notifyCardReady(deckSize) {
    cachedCards++;

    const detail = { cachedCards, deckSize };

    w.dispatchEvent(
        new CustomEvent(CARD_READY, { detail })
    );
}

export function cacheDeck(deck) {
    const fullDeck = [...deck, { image: BACK_FACE_IMAGE_URL }],
        fullDeckSize = fullDeck.length;

    fullDeck.forEach(card => {
        const cardImage = w.document.createElement('img');

        cardImage.onload = () => notifyCardReady(fullDeckSize);
        cardImage.src = card.image;
    });
}
