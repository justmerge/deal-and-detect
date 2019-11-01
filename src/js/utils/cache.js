import w from 'window';
import { DECK, EVENTS } from 'constants';

const { CARD_READY } = EVENTS;

let cachedCards = 0;

function notifyCardReady(deckSize) {
    cachedCards++;

    const detail = { cachedCards, deckSize };

    w.dispatchEvent(
        new CustomEvent(CARD_READY, { detail })
    );
}

export function cacheDeck(deck) {
    const deckSize = deck.length;

    deck.forEach(card => {
        const cardImage = w.document.createElement('img');

        cardImage.onload = () => notifyCardReady(deckSize);
        cardImage.src = card.image;
    });
}