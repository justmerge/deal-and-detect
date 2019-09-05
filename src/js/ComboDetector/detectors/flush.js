import { sanitize } from './helper';

function filterBySuit(hand) {
    let filteredCards = [];

    for (let i = 0; i < hand.length; i++) {
        filteredCards = hand.filter(card =>
            hand[i].suit === card.suit
        );

        if (filteredCards.length === 5) {
            break;
        }
    }

    return filteredCards;
}

function prepare(hand) {
    return new Promise(resolve => {
        hand = sanitize(hand);
        
        resolve(hand);
    });
}

function solve(sanitizedHand) {
    return new Promise(resolve => {
        const cardIndices = filterBySuit(sanitizedHand)
                                .map(card => card.index);

        resolve(cardIndices);
    });
}

onmessage = ({ data: hand }) => {
    prepare(hand)
        .then(solve)
        .then(cardIndices => postMessage({ 
                isValid: cardIndices.length === 5 ? true : false, 
                cardIndices
            })
        );
};