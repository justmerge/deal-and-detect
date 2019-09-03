import w from 'window';

const DEBUG = 'debug';

export function isDebugMode() {
    return w.location.search.includes(DEBUG);
}

export function getCardsFromParams() {
    const urlParams = new URLSearchParams(w.location.search);

    return urlParams.get(DEBUG);
}

