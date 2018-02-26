import './main.scss';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { tweetReducer } from './reducers';
import { tweetSaga } from './sagas';
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(tweetReducer, applyMiddleware(sagaMiddleware));
class Main extends React.Component {
    render() {
        return (React.createElement("div", null, "Test1"));
    }
}
sagaMiddleware.run(tweetSaga);
ReactDom.render(React.createElement(Main, null), document.getElementById("react-container"));
//# sourceMappingURL=main.js.map