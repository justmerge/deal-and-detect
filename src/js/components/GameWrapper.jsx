import React, { Component } from 'react';
import PokerTable from 'components/PokerTable';
import Button from 'components/Button';

import w from 'window';
import { requestCards } from 'API';

import {
    EMPTY_HAND,
    EVENTS,
    HAND
} from 'constants';

const {
    NEW_HAND,
    LAST_FLIPPED,
    LAST_RENDERED,
    WINNING_COMBO
} = EVENTS;

class GameWrapper extends Component {
    constructor(props) {
        super(props);

        this._clearHand = this._clearHand.bind(this);
        this._dealNewHand = this._dealNewHand.bind(this);
        this._highlightCombo = this._highlightCombo.bind(this);
        this._flipCards = this._flipCards.bind(this);
        this._publishToDetectors = this._publishToDetectors.bind(this);
        
        this.initialState = {
            activeHand: EMPTY_HAND,
            currentAction: this._dealNewHand,
            isFlipped: false,
            winningCombo: '',
            winningIndices: []
        };

        this.state = this.initialState;

        w.addEventListener(WINNING_COMBO, this._highlightCombo);
    }

    render() {
        const {
            activeHand,
            currentAction,
            isFlipped,
            winningCombo,
            winningIndices
        } = this.state;

        return (
            <div className='game-wrapper'>
                <PokerTable 
                    hand={activeHand}
                    isFlipped={isFlipped}
                    winningCombo={winningCombo}
                    winningIndices={winningIndices}
                />

                <div className='controls'>
                    <Button
                        callback={currentAction} 
                        label={isFlipped ? 'reset' : 'new hand'}
                    />
                </div>
            </div>
        );
    }

    _clearHand() {
        const { 
            currentAction, isFlipped,
            winningCombo, winningIndices
        } = this.initialState;

        this.setState({
            currentAction, isFlipped,
            winningCombo, winningIndices 
        });
    }

    _dealNewHand() {
        requestCards(HAND)
            .then(activeHand => {
                this.setState({
                    activeHand
                }, () => {
                    w.addEventListener(
                        LAST_RENDERED, 
                        this._flipCards
                    );
                })
            });
    }

    _flipCards() {
        w.removeEventListener(LAST_RENDERED, this._flipCards);

        this.setState({
            isFlipped: true,
            currentAction: this._clearHand
        }, () => {
            w.addEventListener(
                LAST_FLIPPED,
                this._publishToDetectors
            );
        })
    }

    _highlightCombo({ detail }) {
        this.setState(detail);
    }

    _publishToDetectors() {
        w.removeEventListener(LAST_FLIPPED, this._publishToDetectors);
        w.dispatchEvent(new CustomEvent(
            NEW_HAND, 
            { detail: this.state.activeHand }
        ));
    }
}

export default GameWrapper;