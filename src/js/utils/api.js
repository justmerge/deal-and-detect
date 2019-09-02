import { DECK } from 'constants';

const BASE_ENDPOINT = 'https://deckofcardsapi.com/api/deck';

function resolveEndpoint(cardsCount, deckId) {
    return `${BASE_ENDPOINT}/${deckId}/draw/?count=${cardsCount}`;
}

export function requestCards(cardsCount = DECK, deckId = 'new') {
    return fetch(resolveEndpoint(cardsCount, deckId))
        .then(response => {
            const { ok, status } = response;

            return ok ? 
                response.json() : 
                Promise.reject(new Error(`Status code: ${status}`));
        })
        .then(({ success, cards }) => {
            return success ? 
                cards : 
                Promise.reject(new Error('Request was not successful.'))
        })
        .catch(err => {
            throw new Error(`Failed to retrieve deck ID: '${deckId}' (${cardsCount} cards).\n${err}`);
        });
}