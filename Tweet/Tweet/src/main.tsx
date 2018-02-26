import './main.scss';
import * as es6p from 'es6-promise';
es6p.polyfill();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import { tweetReducer } from './reducers'
import { tweetSaga } from './sagas'
import { getTweets } from './actions'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
    tweetReducer,
    applyMiddleware(sagaMiddleware)
)

class Main extends React.Component {
    render() {
        return (<div>Test1</div>);
    }
}

sagaMiddleware.run(tweetSaga);

store.dispatch(getTweets());

ReactDom.render(<Main></Main>, document.getElementById("react-container"));