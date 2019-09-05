import { sanitize } from './helper';

const TWO = 2,
    TEN = 10,
    ACE = 14;

function checkSequence(sortedHand) {
    let candidateStraight = [];

    sortedHand.forEach((currentCard, index) => {
        const nextCard = sortedHand[index + 1] || null;

        if ((!!nextCard && currentCard.value === (nextCard.value - 1) && 
            currentCard.suit === nextCard.suit) || candidateStraight.length === 4) {

            candidateStraight.push(currentCard);
        }
    });

    return candidateStraight;
}

function prepare(hand) {
    return new Promise(resolve => {
        hand = sanitize(hand);

        const sortedHandByValue = hand.sort(
            (cardA, cardB) => (parseInt(cardA.value, 10) - parseInt(cardB.value))
        );

        if (sortedHandByValue[0].value === TWO && 
            sortedHandByValue[4].value === ACE) {
            hand[4].value = 1;
            sortedHandByValue.unshift(hand[4]);
            sortedHandByValue.pop();
        }
        
        resolve(sortedHandByValue);
    });
}

function solve(sortedHand) {
    return new Promise(resolve => {
        const candidateStraight = sortedHand[0].value === TEN ?
            checkSequence(sortedHand).map(card => card.index) : [];

        resolve(candidateStraight);
    });
}

onmessage = ({ data: hand }) => {
    prepare(hand)
        .then(solve)
        .then(cardIndices => 
            postMessage({ 
                isValid: cardIndices.length === 5 ? true : false, 
                cardIndices
            })
        );
};