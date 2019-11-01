import React, { Component } from 'react';
import Card from 'components/Card';

function checkIfLast(handSize, index) {
    return (handSize - 1) === index;
}

function resolveClassNames(winningIndices) {
    return `hand${winningIndices.length ? ' is-highlighted' : ''}`;
}

class Hand extends Component {
    render() {
        const { 
            hand,
            isFlipped,
            winningIndices
        } = this.props;

        return(
            <div className={resolveClassNames(winningIndices)}>
                {hand.map((card, index) => {
                    const { 
                        image: URL,
                    } = card;

                    return <Card key={index}
                        index={index}
                        cardImageUrl={URL}
                        isFlipped={isFlipped}
                        isLast={checkIfLast(hand.length, index)}
                        isHighlighted={winningIndices.includes(index)}
                    />
                })}
            </div>
        );
    }
}

export default Hand;