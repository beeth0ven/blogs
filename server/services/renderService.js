import React from 'react';
import {match, RoutingContext} from 'react-router';
import {createStore} from "redux";
import * as hist from 'history'
import reducers from '../../src/reducers';
import routes from '../../src/routes';
import {renderToStaticMarkup} from 'react-dom/server';
import {Provider} from "react-redux";
import fetchServerSide from "./fetchServerSide";

const renderFullHtml = (html, initialState) => {
  return `
  <!doctype html>
  <html>
    <head>
     <title>Publishing App Server Side Rendering</title>
    </head>
    <body>
      <div id="publishingAppRoot">${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src="/static/app.js"></script>
    </body>
  </html>
  `
};

const handler = (req, res, next, store) => (err, redirectLocation, renderProps) => {
  if (redirectLocation) {
    res.redirect(301, redirectLocation.pathname + redirectLocation.search);
  } else if (err) {
    console.log(err);
    next(err);
    // res.send(500, error.message);
  } else if (renderProps === null) {
    res.status(404)
      .send('Not found')
  } else {

    if (typeof renderProps === 'undefined') {
      return;
    }

    const html = renderToStaticMarkup(
      <Provider store={store}>
        <RoutingContext {...renderProps}/>
      </Provider>
    );

    const initialState = store.getState();

    const fullHTML = renderFullHtml(html, initialState);
    res.send(fullHTML);
  }
};

const handleServerSideRender = async (req, res, next) => {
  try {
    const initMockStore = await fetchServerSide();
    const store = createStore(reducers, initMockStore);
    const location = hist.createLocation(req.path);

    match({
        routes: routes,
        location
      }, handler(req, res, next, store)
    );
  } catch (err) {
    next(err)
  }
};

export { handleServerSideRender };