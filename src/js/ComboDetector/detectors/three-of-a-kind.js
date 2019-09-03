const SUIT_RANKS = {
    "CLUBS": 1,
    "DIAMONDS": 2,
    "HEARTS": 3,
    "SPADES": 4
};

function filterByValue(hand) {
    let filteredCards = [];

    for (let i = 0; i < hand.length; i++) {
        filteredCards = hand.filter(card =>
            hand[i].value === card.value
        );

        if (filteredCards.length === 3) {
            break;
        }
    }

    return filteredCards;
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
        
        resolve(hand);
    });
}

function solve(sanitizedHand) {
    return new Promise(resolve => {
        const cardIndices = filterByValue(sanitizedHand)
                                .map(card => card.index);

        resolve(cardIndices);
    });
}

onmessage = ({ data: hand }) => {
    prepare(hand)
        .then(solve)
        .then(cardIndices => postMessage({ 
                isValid: cardIndices.length === 3 ? true : false, 
                cardIndices
            })
        );
};