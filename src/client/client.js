// Startup point for the client side application
import 'babel-polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import Root from './Root'

ReactDOM.hydrate(
    <Root>
        <BrowserRouter>
            <div>{renderRoutes(routes)}</div>
        </BrowserRouter>
    </Root>,
    document.querySelector('#root')
);