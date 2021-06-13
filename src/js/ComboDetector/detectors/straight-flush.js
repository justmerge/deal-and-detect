import { detectCombo } from 'ComboDetector/helper';

function checkSequence(sortedHand) {
    let candidateStraight = [];

    sortedHand.forEach((currentCard, index) => {
        const nextCard = sortedHand[index + 1] || null;

        if (
            (!!nextCard && currentCard.value === (nextCard.value - 1) && currentCard.suit === nextCard.suit) ||
            candidateStraight.length === 4
        ) {
            candidateStraight.push(currentCard);
        }
    });

    return candidateStraight;
}

function solve(sortedHand) {
    return new Promise(resolve => {
        const candidateStraight = checkSequence(sortedHand)
            .map(({index}) => index);

        resolve(candidateStraight);
    });
}

onmessage = ({ data }) => detectCombo(data.hand, data.sort, solve);