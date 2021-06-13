/**
 * Suits constants
 */

export const CLUBS = 'CLUBS';
export const DIAMONDS = 'DIAMONDS';
export const HEARTS = 'HEARTS';
export const SPADES = 'SPADES';

export const SUIT_RANKS = {
    [CLUBS]: 1,
    [DIAMONDS]: 2,
    [HEARTS]: 3,
    [SPADES]: 4
};

/**
 * Values constants
 */

export const VALUES = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
    ONE: 1,
    TWO: 2,
    TEN: 10,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
};

/**
 * Workers path string template
 */

export const DETECTORS_PATH = 
    comboType => `Detectors/${comboType}.js`;
