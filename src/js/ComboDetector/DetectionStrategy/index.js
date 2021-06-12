import { getWorkerByType } from 'Detectors';

class DetectionStrategy {
    constructor(combo) {
        this.type = combo.getType();
        this.rank = combo.getRank();
        this.length = combo.getLength();
        this.sort = combo.getIsSort();

        this.solver = getWorkerByType(this.type);
        this.solver.onmessage = this.handleSolverResponse.bind(this);

        this.isValid = false;
        this.validComboIndices = [];
        this.notifyResult = () => {};
    }

    handleSolverResponse({ data }) {
        const {cardIndices} = data;

        this.isValid = cardIndices.length === this.length;
        this.validComboIndices = cardIndices;

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

    getIsValid() {
        return this.isValid;
    }

    solve(hand) {
        return new Promise(notifyResult => {
            this.notifyResult = notifyResult;
            this.solver.postMessage({
                hand,
                sort: this.sort
            });
        });
    }
}

export default DetectionStrategy;
