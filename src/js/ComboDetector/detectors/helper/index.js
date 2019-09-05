export const SUIT_RANKS = {
    "CLUBS": 1,
    "DIAMONDS": 2,
    "HEARTS": 3,
    "SPADES": 4
};

export function sanitize(hand) {
    return hand.map((card, index) => {
        card.index = index;

        switch(card.value) {
            case "JACK":
                card.value = 11;
                break;
            case "QUEEN":
                card.value = 12;
                break;
            case "KING":
                card.value = 13;
                break;
            case "ACE":
                card.value = 14;
                break;
            default:
                card.value = parseInt(card.value, 10);
                break;
        }

        return card;
    });
}