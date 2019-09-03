import { getWorkerByType } from 'Detectors';

class DetectorStrategy {
    constructor(combo) {
        this.type = combo.getType();
        this.rank = combo.getRank();

        this.solver = getWorkerByType(this.type);
        this.solver.onmessage = this.handleSolverReponse.bind(this);

        this.isValid = false;
        this.validComboIndices = [];
        this.notifyResult = () => {};
    }

    handleSolverReponse({ data }) {
        console.log(`Detector '${this.type}' has replied.`);

        const {
            isValid,
            cardIndices
        } = data;

        this.setIsValid(isValid);
        this.setValidComboIndices(cardIndices);

        this.notifyResult(this);
    }

    getRank() {
        return this.rank;
    }

    getType() {
        return this.type;
    }

    getValidComboIndices() {
        return this.validComboIndices;
    }

    setValidComboIndices(validCards) {
        this.validComboIndices = validCards;
    }

    getIsValid() {
        return this.isValid;
    }

    setIsValid(isValid) {
        this.isValid = isValid;
    }

    solve(hand) {
        return new Promise(notifyResult => {
            this.notifyResult = notifyResult;
            this.solver.postMessage(hand);
        });
    }
}

export default DetectorStrategy;