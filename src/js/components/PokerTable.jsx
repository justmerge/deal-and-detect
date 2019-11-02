
import React from 'react';
import Hand from 'components/Hand';
import SidePanel from 'components/SidePanel';

function PokerTable(props) {
    const {
        winningCombo
    } = props;

    // TODO implement quick ComboTeller (and remove after SidePanel is impl.)
    return (
        <div className='poker-table container'>
            <Hand {...props} />
            <SidePanel winningCombo={winningCombo} />
        </div>
    );
}

export default PokerTable;