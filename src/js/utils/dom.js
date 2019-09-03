import w from 'window';
import { requestCards } from 'API';
import { 
    HAND,
    DECK,
    EVENTS 
} from 'constants';

const { 
    NEW_HAND,
    WINNING_COMBO
} = EVENTS;

const DOM = {
    requestHandBtn: w.document.querySelector('.controls button'),
    cards: Array.from(w.document.querySelectorAll('.card')),
    cardsBack: Array.from(w.document.querySelectorAll('.card-back')),
    loader: w.document.querySelector('.loader'),
    loaderPerc: w.document.querySelector('.loader .percentage'),
    winningCombo: w.document.querySelector('.winning-combo')
};

let FLIPPED = false;

function highlightCards({ detail }) {
    const { 
        winningCombo,
        winningCardsIndices
    } = detail;

    DOM.winningCombo.innerText = winningCombo;

    winningCardsIndices.forEach(index => {
        DOM.cardsBack[index].classList.add('highlight');
    });
}

function doFlip(hand) {
    return new Promise(invokeDetectors => {
        FLIPPED = !FLIPPED;

        DOM.cards.forEach((card, index) => {
            setTimeout(() => {
                const isFlipped = card.className.indexOf('flip') === -1,
                    isHighlighted = card.className.indexOf('highlight') > -1
        
                card.classList.toggle('flip', isFlipped);
                DOM.cardsBack[index].classList.toggle('flip', isFlipped);
                DOM.cardsBack[index].classList.toggle('highlight', isHighlighted);
                
                // TODO: A listener for a 'transitionEnd'
                // of the last card is necessary to avoid this
                // ugly delayed invocation.
                HAND === (index + 1) && setTimeout(() => {
                    invokeDetectors(hand);
                }, (200 * HAND / 2));
            }, (200 * index));
        });
    });
};

function prepareHand(hand) {
    return new Promise(proceed => {
        hand.forEach((card, index) => {
            DOM.cardsBack[index].setAttribute(
                'style', 
                `background-image: url('${card.image}')`
            );
        });

        proceed(hand);
    });
};

function publishToDetectors(hand) {
    if (FLIPPED) {
        w.dispatchEvent(new CustomEvent(
            NEW_HAND, 
            { detail: hand }
        ));
    }
}

function requestHand() {
    return FLIPPED ? 
        Promise.resolve() : 
        requestCards(HAND)
            .then(prepareHand);
}

function dealNewHand() {
    requestHand()
        .then(doFlip)
        .then(publishToDetectors);
}

export function removeLoader() {
    DOM.loader.remove();
}

export function updateLoader(msg, deckSize = DECK) {
    if (typeof msg === 'string') {
        DOM.loader.innerText = msg;
    } else { 
        DOM.loaderPerc.innerText = parseInt((msg * 100 / deckSize), 10);
    }
}

export function attachDOMListeners() {
    return new Promise(done => {
        w.addEventListener(WINNING_COMBO, highlightCards)
        DOM.requestHandBtn.addEventListener('click', dealNewHand);

        done();
    });
}