import { sanitize } from './helper';

function filterByValue(hand) {
    let filteredCards = [];

    for (let i = 0; i < hand.length; i++) {
        filteredCards = hand.filter(card =>
            hand[i].value === card.value
        );

        if (filteredCards.length === 2) {
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
        const cardIndices = filterByValue(sanitizedHand)
                                        .map(card => card.index);

        if (cardIndices.length) {
            cardIndices.push(
                ...filterByValue(
                    sanitizedHand.filter(card => !cardIndices.includes(card.index))
                ).map(card => card.index)
            );
        }

        resolve(cardIndices);
    });
}

onmessage = ({ data: hand }) => {
    prepare(hand)
        .then(solve)
        .then(cardIndices => postMessage({ 
                isValid: cardIndices.length === 4 ? true : false, 
                cardIndices
            })
        );
};