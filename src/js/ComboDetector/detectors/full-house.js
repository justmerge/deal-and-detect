import { sanitize } from './helper';

const PAIR = 2,
    THREE_OF_A_KIND = 3;

function filterByValue(hand, howMany) {
    let filteredCards = [];

    for (let i = 0; i < hand.length; i++) {
        filteredCards = hand.filter(card =>
            hand[i].value === card.value
        );

        if (filteredCards.length === howMany) {
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
        const cardIndices =
			filterByValue(sanitizedHand, PAIR)
				.map(card => card.index);

        if (cardIndices.length) {
            cardIndices.push(
                ...filterByValue(
                    sanitizedHand.filter(card => !cardIndices.includes(card.index)),
                    THREE_OF_A_KIND
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
                isValid: cardIndices.length === 5,
                cardIndices
            })
        );
};
