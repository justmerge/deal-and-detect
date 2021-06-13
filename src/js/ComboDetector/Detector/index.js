class Detector {
    constructor({length, name, rank, sort, type}) {
        this.length = length;
        this.name = name;
        this.rank = rank;
        this.sort = sort;
        this.type = type;

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

    getName() {
        return this.name;
    }

    getRank() {
        return this.rank;
    }

    getValidComboIndices() {
        return this.validComboIndices;
    }

    getIsValid() {
        return this.isValid;
    }

    initialize() {
        return import(`worker-loader!Detectors/${this.type}.js`)
            .then(({default: SolverWorker}) => {
                this.solver = SolverWorker();
                this.solver.onmessage = this.handleSolverResponse.bind(this);
            });
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

export default Detector;
