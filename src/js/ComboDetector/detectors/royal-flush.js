import { detectCombo } from 'ComboDetector/helper';
import { VALUES } from 'ComboDetector/helper/constants';

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

function solve(sortedHand) {
    return new Promise(resolve => {
        const candidateStraight = sortedHand[0].value === VALUES.TEN ?
            checkSequence(sortedHand).map(card => card.index) : [];

        resolve(candidateStraight);
    });
}

onmessage = ({ data }) => detectCombo(data.hand, data.sort, solve);
