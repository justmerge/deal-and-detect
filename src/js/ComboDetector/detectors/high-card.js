const SUIT_RANKS = {
    "CLUBS": 1,
    "DIAMONDS": 2,
    "HEARTS": 3,
    "SPADES": 4
};

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

function storeAndSanitize(hand) {
    return hand.map((card, index) => {
        card.index = index;

        switch(card.value) {
            case "JACK":
                card.value = 11;
                break;
            case "QUEEN":
                card.value = 12;
                break;
            case "KING":
                card.value = 13;
                break;
            case "ACE":
                card.value = 14;
                break;
            default:
                card.value = parseInt(card.value, 10);
                break;
        }

        return card;
    });
}

function prepare(hand) {
    return new Promise(resolve => {
        hand = storeAndSanitize(hand);

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