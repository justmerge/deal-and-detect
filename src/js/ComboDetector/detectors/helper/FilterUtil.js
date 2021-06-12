function filter(hand, howMany, by) {
    let filteredCards = [];

    for (let i = 0; i < hand.length; i++) {
        filteredCards = hand.filter(card =>
            hand[i][by] === card[by]
        );

        if (filteredCards.length === howMany) {
            break;
        }
    }

    return filteredCards;
}

const FilterUtil = {
    bySuit(hand, howMany) {
        return filter(hand, howMany, 'suit');
    },

    byValue(hand, howMany) {
        return filter(hand, howMany, 'value');
    }
};

export default FilterUtil;