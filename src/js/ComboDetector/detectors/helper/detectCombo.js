import { VALUES } from './constants';

function sortByValue(hand) {
    const sortedHand = hand.sort(
        ({value: A}, {value: B}) => A - B
    );

    const [{value: firstValue},,,, {value: lastValue}] = sortedHand;

    if (firstValue === VALUES.TWO && lastValue === VALUES.ACE) {
        const ace = sortedHand.pop();

        ace.value = VALUES.ONE;
        sortedHand.unshift(ace);
    }

    return sortedHand;
}

function prepare(hand, sort = false) {
    return new Promise(resolve => {
        const sanitizedHand = hand.map(
            ({value, ...card}, index) => ({
                ...card,
                index,
                value: VALUES[value]
            })
        );

        resolve(
            sort 
            ? sortByValue(sanitizedHand) 
            : sanitizedHand
        );
    });
}

export default function detectCombo(
    hand = [], 
    sort = false,
    solve = () => Promise.resolve([]),
) {
    prepare(hand, sort)
        .then(solve)
        .then((cardIndices) => postMessage({cardIndices}))
}