import { detectCombo } from './helper';
import { SUIT_RANKS } from './helper/constants';

function getHighCardBySuitRank(hand) {
    let [highCard] = hand;

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
    const [firstCandidate, secondCandidate] = hand.reverse();

    if (firstCandidate.value === secondCandidate.value) {
        return getHighCardBySuitRank(hand);
    }

    return firstCandidate;
}

function solve(sortedHand) {
    return new Promise(resolve => {
        const {index: highCardIndex} = getHighCardByValue(sortedHand);

        resolve([highCardIndex]);
    });
}

onmessage = ({ data }) => detectCombo(data.hand, data.sort, solve);