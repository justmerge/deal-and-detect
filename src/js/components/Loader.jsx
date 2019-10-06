import w from 'window';
import { EVENTS, DECK } from 'constants';
import React, {Component} from 'react';

const { CARD_READY } = EVENTS;

function getPercentage(cachedCards, deckSize) {
    return `${parseInt((cachedCards * 100 / deckSize), 10)}%`;
}

class Loader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cachedCards: 0,
            deckSize: DECK
        };

        w.addEventListener(CARD_READY, this._update.bind(this));
    }

    componentWillUnmount() {
        w.removeEventListener(CARD_READY, this._update);
    }

    render() {
        // TODO This is pre-react HTML structure,
        // reform and restyle.

        const { cachedCards, deckSize } = this.state;
        
        return(
            <div className="loader">
                <p>
                    Loading...&nbsp;&nbsp;&nbsp;
                    {getPercentage(cachedCards, deckSize)}
                </p>
            </div>
        );
    }

    _update({ detail }) {
        const { 
            cachedCards, 
            deckSize 
        } = detail,
            isDoneCaching = cachedCards === deckSize;

        isDoneCaching
        ? this.props.hasLoaded()
        : this.setState({ cachedCards, deckSize });
    }
}

export default Loader;