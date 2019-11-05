import React from 'react';

import w from 'window';
import { EVENTS } from 'constants';

function resolveClassNames(isFlipped, isHighlighted) {
    return `card${isFlipped ? ' is-flipped' : ''}${isHighlighted ? ' is-highlighted' : ''}`;
}

function notifyLastFlippedCard() {
    setTimeout(() => {
        w.dispatchEvent(
            new CustomEvent(EVENTS.LAST_FLIPPED)
        );
    }, 1000);
}

function notifyLastRenderedCard() {
    setTimeout(() => {
        w.dispatchEvent(
            new CustomEvent(EVENTS.LAST_RENDERED)
        );
    }, 500);
}

function getBackgroundImage(url) {
    return !!url ? `url(${url})` : 'none';
}

function Card(props) {
    const {
        cardImageUrl,
        isFlipped,
        isLast,
        isHighlighted
    } = props;

    !isFlipped && isLast && notifyLastRenderedCard();

    isFlipped && isLast && notifyLastFlippedCard();

    return(
        <div className={resolveClassNames(isFlipped, isHighlighted)}>
            <div className='card__face card__face--back'></div>
            <div
                className='card__face card__face--front'
                style={{ backgroundImage: getBackgroundImage(cardImageUrl) }}
            />
        </div>
    );
}

export default Card;