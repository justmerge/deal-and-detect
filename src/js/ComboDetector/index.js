import w from 'window';
import Detector from 'ComboDetector/Detector';
import { 
    COMBO_TYPES,
    EVENTS 
} from 'constants';

const {
    NEW_HAND,
    WINNING_COMBO
} = EVENTS;

const DETECTORS = [];

function publishToDOM(winningRank) {
    const detail = {
        winningCombo: winningRank.getName(),
        winningIndices: winningRank.getValidComboIndices()
     };

    w.dispatchEvent(new CustomEvent(WINNING_COMBO, { detail }));
}

function resolveWinningRank(detectorsResponse) {
    return new Promise(resolve => {
        const candidateWinners = detectorsResponse.filter(
            detectedCombo => detectedCombo.getIsValid()
        );
    
        const winningRank = candidateWinners.sort(
            (comboA, comboB) => comboA.getRank() - comboB.getRank()
        ).pop();

        console.log(`${winningRank.getName().toUpperCase()} WINS`)

        resolve(winningRank);
    });
}

function solveHand({ detail: hand }) {
    Promise
        .all([ ...DETECTORS.map(detector => detector.solve(hand)) ])
        .then(resolveWinningRank)
        .then(publishToDOM);
}

export function registerDetectors() {
    DETECTORS.push(
        ...Object.values(COMBO_TYPES).map(
            comboType => new Detector(comboType)
        )
    );

    return Promise.all(
        DETECTORS.map(detector => detector.initialize())
    ).then(() => Promise.resolve());
}

export function attachHandListener() {
    w.addEventListener(NEW_HAND, solveHand);
}