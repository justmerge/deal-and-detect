import w from 'window';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'components/AppContainer.jsx';
import { APP_ID } from 'constants';

export function renderApp() {
    return new Promise(resolve => {
        const appWrapper = w.document.getElementById(APP_ID);

        !!appWrapper && ReactDOM.render(<AppContainer />, appWrapper);
        resolve();
    });
}