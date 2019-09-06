// TODO: Avoid this map as soon as a decent worker loader is adopted.

import ROYAL_FLUSH from 'worker-loader!Detectors/royal-flush.js';
import STRAIGHT_FLUSH from 'worker-loader!Detectors/straight-flush.js';
import FOUR_OF_A_KIND from 'worker-loader!Detectors/four-of-a-kind.js';
import FULL_HOUSE from 'worker-loader!Detectors/full-house.js';
import FLUSH from 'worker-loader!Detectors/flush.js';
import STRAIGHT from 'worker-loader!Detectors/straight.js';
import THREE_OF_A_KIND from 'worker-loader!Detectors/three-of-a-kind.js';
import TWO_PAIR from 'worker-loader!Detectors/two-pair.js';
import PAIR from 'worker-loader!Detectors/pair.js';
import HIGH_CARD from 'worker-loader!Detectors/high-card.js';

const ComboDetectionWorker = {
    'royal-flush': ROYAL_FLUSH,
    'straight-flush': STRAIGHT_FLUSH,
    'four-of-a-kind': FOUR_OF_A_KIND,
    'full-house': FULL_HOUSE,
    'flush': FLUSH,
    'straight': STRAIGHT,
    'three-of-a-kind': THREE_OF_A_KIND,
    'two-pair': TWO_PAIR,
    'pair': PAIR,
    'high-card': HIGH_CARD
};

export function getWorkerByType(type) {
    return new ComboDetectionWorker[type]();
}