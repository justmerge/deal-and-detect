import w from 'window';
import Combo from 'ComboDetector/Combo';
import DetectorStrategy from 'ComboDetector/DetectorStrategy';
import { 
    COMBO_TYPES,
    EVENTS 
} from 'constants';

const { 
    NEW_HAND,
    WINNING_COMBO
} = EVENTS;

const detectors = [];

function publishToDOM(winningRank) {
    const detail = {
        winningCombo: winningRank.getType(),
        winningCardsIndices: winningRank.getValidComboIndices()
     };

    w.dispatchEvent(new CustomEvent(WINNING_COMBO, { detail }));
}

function resolveWinningRank(detectedCombos) {
    return new Promise(resolve => {
        const candidateWinners = detectedCombos.filter(
            combo => combo.getIsValid()
        );
    
        const winningRank = candidateWinners.sort(
            (comboA, comboB) =>
                (comboA.getRank() - comboB.getRank())
        ).pop();

        resolve(winningRank);
    });
}

function solveHand({ detail: hand }) {
    Promise
        .all([ ...detectors.map(detector => detector.solve(hand)) ])
        .then(resolveWinningRank)
        .then(publishToDOM);
}

export function initializeDetectionStrategies() {
    detectors.push(
        ...Object.keys(COMBO_TYPES).map(type =>  
                new DetectorStrategy(new Combo(COMBO_TYPES[type]))
        )
    );

    w.addEventListener(NEW_HAND, solveHand);
}