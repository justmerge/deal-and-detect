import { getWorkerByType } from 'Detectors';

class DetectionStrategy {
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
        const {
            isValid,
            cardIndices
        } = data;

        isValid && console.log(`${this.type} is valid.`);

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

export default DetectionStrategy;
