import { HAND, DECK } from 'constants';
import { isDebugMode, getCardsFromParams } from 'Utils/debug';

const BASE_ENDPOINT = 'https://deckofcardsapi.com/api/deck',
    DEBUG_ENDPOINT = `${BASE_ENDPOINT}/new/shuffle/?cards=`;

// TODO: Find a more decoupled way to integrate the debug mode
function resolveEndpoint(cardsCount, deckId, debugMode = false) {
    return debugMode ? 
        `${DEBUG_ENDPOINT}${getCardsFromParams()}` :
        `${BASE_ENDPOINT}/${deckId}/draw/?count=${cardsCount}`;
}

function handleDebugModeRequest(payload) {
    return isDebugMode() ? 
        fetch(resolveEndpoint(HAND, payload.deck_id, false))
            .then(response => response.json()) : 
        Promise.resolve(payload);
}

export function requestCards(cardsCount = DECK, deckId = 'new') {
    return fetch(resolveEndpoint(cardsCount, deckId, isDebugMode()))
        .then(response => {
            const { ok, status } = response;

            return ok ? 
                response.json() : 
                Promise.reject(new Error(`Status code: ${status}`));
        })
        .then(handleDebugModeRequest)
        .then(({ success, cards }) => {
            return success ? 
                cards : 
                Promise.reject(new Error('Request was not successful.'))
        })
        .catch(err => {
            throw new Error(`Failed to retrieve deck ID: '${deckId}' (${cardsCount} cards).\n${err}`);
        });
}