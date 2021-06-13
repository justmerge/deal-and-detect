export const APP_ID = 'deal-and-detect';

export const HAND = 5;
export const DECK = 52;
export const TOTAL_COMBOS = 10;

export const EMPTY_HAND = [{}, {}, {}, {}, {}];

export const GAME_TYPES = {
    DEAL_AND_DETECT: 'deal-and-detect'
};

export const EVENTS = {
    CARD_READY: 'cardReady',
    NEW_HAND: 'newHand',
    WINNING_COMBO: 'winningCombo',
    LAST_RENDERED: 'lastRendered',
    LAST_FLIPPED: 'lastFlipped'
};

export const COMBO_TYPES = {
    ROYAL_FLUSH: {
        length: 5,
        name: 'royal flush',
        type: 'royal-flush',
        rank: 10,
        sort: true,
    },
    
    STRAIGHT_FLUSH: {
        length: 5,
        name: 'straight flush',
        type: 'straight-flush',
        rank: 9,
        sort: true,
    },
    
    FOUR_OF_A_KIND: {
        length: 4,
        name: 'four of a kind',
        type: 'four-of-a-kind',
        rank: 8,
        sort: false,
    },
    
    FULL_HOUSE: {
        length: 5,
        name: 'full house',
        type: 'full-house',
        rank: 7,
        sort: false,
    },
    
    FLUSH: {
        length: 5,
        name: 'flush',
        type: 'flush',
        rank: 6,
        sort: false,
    },
    
    STRAIGHT: {
        length: 5,
        name: 'straight',
        type: 'straight',
        rank: 5,
        sort: true,
    },
    
    THREE_OF_A_KIND: {
        length: 3,
        name: 'three of a kind',
        type: 'three-of-a-kind',
        rank: 4,
        sort: false,
    },
    
    TWO_PAIR:  {
        length: 4,
        name: 'two pair',
        type: 'two-pair',
        rank: 3,
        sort: false,
    },
    
    PAIR: {
        length: 2,
        name: 'pair',
        type: 'pair',
        rank: 2,
        sort: false,
    },
    
    HIGH_CARD: {
        length: 1,
        name: 'high card',
        type: 'high-card',
        rank: 1,
        sort: true,
    }
};
