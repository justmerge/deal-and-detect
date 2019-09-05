import { SUIT_RANKS, sanitize } from './helper';

function getHighCardBySuitRank(hand) {
    let highCard = hand[0];

    hand.forEach((currentCard, index) => {
        const nextCard = hand[index + 1] || null;

        if (!!nextCard) {
            const currentHighCardSuitRank = SUIT_RANKS[highCard.suit],
                nextCardSuitRank = SUIT_RANKS[nextCard.suit];
            
            if (currentCard.value === nextCard.value &&
                nextCardSuitRank > currentHighCardSuitRank) {
                
                highCard = nextCard;
            }
        }
    });

    return highCard;
}

function getHighCardByValue(hand) {
    const firstCandidate = hand[0],
        secondCandidate = hand[1];

    if (firstCandidate.value === secondCandidate.value) {
        return getHighCardBySuitRank(hand);
    }

    return firstCandidate;
}

function prepare(hand) {
    return new Promise(resolve => {
        hand = sanitize(hand);

        const sortedHandByValue = hand.sort(
            (cardA, cardB) => (parseInt(cardB.value, 10) - parseInt(cardA.value))
        );
        
        resolve(sortedHandByValue);
    });
}

function solve(sortedHand) {
    return new Promise(resolve => {
        const highCard = getHighCardByValue(sortedHand);

        resolve(highCard.index);
    });
}

onmessage = ({ data: hand }) => {
    prepare(hand)
        .then(solve)
        .then(highCardIndex => postMessage({ 
                isValid: true, 
                cardIndices: [highCardIndex]
            })
        );
};