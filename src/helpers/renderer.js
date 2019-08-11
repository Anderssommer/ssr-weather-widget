import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routes from '../client/routes';
import serialize from 'serialize-javascript'; // Serialize initial state to avoid xss attack.
import { ServerStyleSheet, __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS } from 'styled-components';

const htmlTemplate = ({ styles, content, initialState }) => {
    return `
        <html>
            <head>
                <title>Weather app</title>
                ${styles}
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                    window.INITIAL_STATE = ${initialState}
                </script>
                <script src="bundle.js"></script>
            </bod>
        </html>
    `;
}

const jsxContent = (req, store) => (
    <Provider store={store}>
        <StaticRouter location={req.path} context={{}}>
            <div>{renderRoutes(routes)}</div>
        </StaticRouter>
    </Provider>
)

export default (req, store) => {
    if (process.env.JEST_TEST) {
        const { StyleSheet } = __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS /* For testing purposes */
        StyleSheet.reset(true)
    }
    const sheet = new ServerStyleSheet();
    const content = renderToString(sheet.collectStyles(jsxContent(req, store)))
    const styles = sheet.getStyleTags();

    const initialState = serialize(store.getState());
    return htmlTemplate({ styles, content, initialState })
};