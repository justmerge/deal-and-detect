import React from 'react';

function ComboTeller(props) {
    const { winningCombo } = props;

    return(
        <div className={'combo-teller'}>
            <p><span className={!!winningCombo ? 'winning-combo' : ''}>{
                !!winningCombo ? winningCombo : 'Deal a new hand...'
            }</span></p>
        </div>
    );
}

export default ComboTeller;