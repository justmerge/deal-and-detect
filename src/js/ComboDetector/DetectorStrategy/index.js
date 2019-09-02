import { getWorkerByType } from 'Detectors';

class DetectorStrategy {
    constructor(combo) {
        this.type = combo.getType();
        this.rank = combo.getRank();

        this.solver = getWorkerByType(this.type);
        this.solver.onmessage = this.handleSolverReponse.bind(this);

        this.isWinner = false;
        this.winningComboIndices = [];
        this.notifyResult = () => {};
    }

    handleSolverReponse({ data }) {
        console.log(`Detector '${this.type}' has replied.`);

        const {
            isWinner,
            winningCards
        } = data;

        this.setIsWinner(isWinner);
        this.setWinningComboIndices(winningCards);

        this.notifyResult(this);
    }

    getRank() {
        return this.rank;
    }

    getType() {
        return this.type;
    }

    getWinningComboIndices() {
        return this.winningComboIndices;
    }

    setWinningComboIndices(winningCards) {
        this.winningComboIndices = winningCards;
    }

    getIsWinner() {
        return this.isWinner;
    }

    setIsWinner(isWinner) {
        this.isWinner = isWinner;
    }

    solve(hand) {
        return new Promise(notifyResult => {
            this.notifyResult = notifyResult;
            this.solver.postMessage(hand);
        });
    }
}

export default DetectorStrategy;