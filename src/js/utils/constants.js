export const HAND = 5;
export const DECK = 52;
export const TOTAL_COMBOS = 10;

// TODO: evaluate using a 'Map' object
export const EVENTS = {
    CARD_READY: 'cardReady',
    NEW_HAND: 'newHand',
    WINNING_COMBO: 'winningCombo'
};

// TODO: evaluate using a 'Map' object 
export const COMBO_TYPES = {
    ROYAL_FLUSH: {
        name: 'royal flush',
        type: 'royal-flush',
        rank: 10
    },
    
    STRAIGHT_FLUSH: {
        name: 'straight flush',
        type: 'straight-flush',
        rank: 9
    },
    
    FOUR_OF_A_KIND: {
        name: 'four of a kind',
        type: 'four-of-a-kind',
        rank: 8,
    },
    
    FULL_HOUSE: {
        name: 'full house',
        type: 'full-house',
        rank: 7
    },
    
    FLUSH: {
        name: 'flush',
        type: 'flush',
        rank: 6
    },
    
    STRAIGHT: {
        name: 'straight',
        type: 'straight',
        rank: 5
    },
    
    THREE_OF_A_KIND: {
        name: 'three of a kind',
        type: 'three-of-a-kind',
        rank: 4
    },
    
    TWO_PAIR:  {
        name: 'two pair',
        type: 'two-pair',
        rank: 3
    },
    
    PAIR: {
        name: 'pair',
        type: 'pair',
        rank: 2
    },
    
    HIGH_CARD: {
        name: 'high card',
        type: 'high-card',
        rank: 1
    }
};
