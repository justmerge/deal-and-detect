import '../scss/style.scss';

import { attachDOMListeners } from 'Utils/dom';
import { cacheDeck as cacheIt } from 'Utils/cache';
import { requestCards as requestInitialDeck } from 'API';
import { initializeDetectionStrategies } from 'ComboDetector';

function initializeDeck() {
    attachDOMListeners()
        .then(initializeDetectionStrategies)
        .then(requestInitialDeck)
        .then(cacheIt);
}

initializeDeck();