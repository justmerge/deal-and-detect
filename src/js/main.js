import '../scss/style.scss';

import { renderApp as prepareAppContext } from 'components';
import { cacheDeck as cacheIt } from 'Utils/cache';
import { requestCards as requestInitialDeck } from 'API';
import { attachHandListener, registerDetectors } from 'ComboDetector';

export function initialize() {
    prepareAppContext()
        .then(registerDetectors)
        .then(requestInitialDeck)
        .then(cacheIt)
        .then(attachHandListener);
}

initialize();