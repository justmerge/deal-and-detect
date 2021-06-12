class Combo {
    constructor({ type, rank, length, sort }) {
        this.type = type;
        this.rank = rank;
        this.length = length;
        this.sort = sort;
    }

    getType() {
        return this.type;
    }

    getRank() {
        return this.rank;
    }

    getLength() {
        return this.length;
    }

    getIsSort() {
        return this.sort;
    }
}

export default Combo;