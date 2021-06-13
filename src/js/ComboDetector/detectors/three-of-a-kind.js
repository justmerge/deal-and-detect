import { FilterUtil, detectCombo } from 'ComboDetector/helper';
import { VALUES } from 'ComboDetector/helper/constants';

function solve(sanitizedHand) {
    return new Promise(resolve => {
        const cardIndices = FilterUtil.byValue(sanitizedHand, VALUES.THREE)
            .map(card => card.index);

        resolve(cardIndices);
    });
}

onmessage = ({ data }) => detectCombo(data.hand, data.sort, solve);