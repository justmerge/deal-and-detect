
import React from 'react';
import Hand from 'components/Hand';
import ComboTeller from 'components/ComboTeller';

function PokerTable(props) {
    const {
        winningCombo
    } = props;

    // TODO remove ComboTeller when SidePanel is implemented
    return (
        <div className='poker-table container'>
            <Hand {...props} />
            <ComboTeller winningCombo={winningCombo} />
        </div>
    );
}

export default PokerTable;