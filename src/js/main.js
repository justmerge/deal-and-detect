import '../scss/style.scss';

import { renderApp as prepareAppContext } from 'components';
import { cacheDeck as cacheIt } from 'Utils/cache';
import { requestCards as requestInitialDeck } from 'API';
import { initializeDetectionStrategies } from 'ComboDetector';

export function initialize() {
    prepareAppContext()
        .then(initializeDetectionStrategies)
        .then(requestInitialDeck)
        .then(cacheIt);
}

initialize();