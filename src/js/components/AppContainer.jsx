import React, { Fragment, Component } from 'react';
import Loader from 'components/Loader';
import GameWrapper from 'components/GameWrapper';
import { GAME_TYPES } from 'constants';

const { DEAL_AND_DETECT } = GAME_TYPES;

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };

        this._removeLoader = this._removeLoader.bind(this);
    }

    render() {
        return(
            <Fragment>
            {
                this.state.isLoading
                ? <Loader hasLoaded={this._removeLoader}/> 
                : <GameWrapper type={DEAL_AND_DETECT} />
            }
            </Fragment>
        );
    }

    _removeLoader() {
        this.setState({
            isLoading: false
        });
    }
}

export default AppContainer;