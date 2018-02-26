import './main.scss';
import * as es6p from 'es6-promise';
es6p.polyfill();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider, connect } from 'react-redux';

import { tweetReducer } from './reducers'
import { tweetSaga } from './sagas'
import { getTweets } from './actions'
import { Map, List } from 'immutable';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
    tweetReducer,
    applyMiddleware(sagaMiddleware)
)

class Tweet extends React.Component<{ data }> {
    render() {
        return (
            <div className="tw-block">
                <a href="#" className="tw-thumb-container">
                    <img src="https://pbs.twimg.com/profile_images/941796662770651137/cDtLVz1j_bigger.jpg" />
                </a>
                <div className="tweet-container">
                    <div className="tw-header">
                        <h3 className="tw-heading">Mashable</h3>
                        <span className="glyphicon glyphicon-certificate"><span className="glyphicon glyphicon-ok"></span></span>
                        <span className="username u-dir u-textTruncate" data-toggle="popover" data-placement="bottom">@<span>olympicchannel</span></span>
                        <small className="time">
                            <a href="/olympicchannel/status/965906708336914432" className="tweet-timestamp js-permalink js-nav js-tooltip" title="3:11 AM - 20 Feb 2018" data-send-impression-cookie="" data-conversation-id="965906708336914432"><span className="_timestamp js-short-timestamp " data-aria-label-part="last" data-time="1519125079" data-time-ms="1519125079000" data-long-form="true">Feb 20</span></a>
                        </small>
                    </div>
                    <p className="tw-content">
                        Rhythm Shoes can track steps via motion sensors and provide haptic feedback to help users learn choreography.
                        </p>
                    <div className="tw-media"><img data-aria-label-part="" src="https://pbs.twimg.com/media/DW77nOKVoAIKS3Y.jpg" alt="" /></div>
                </div>
                <div className="clr-bth"></div>
            </div>);
    }
}

interface ITweetListProps {
    tweets : List<any>
}

class TweetList extends React.Component<ITweetListProps> {
    render() {
        var tweets = this.props.tweets.map((item) => <Tweet key={item.id_str} data={item} />)
        return (
            <div className="tw-main-wrapper" id="react-container">
                {tweets}
            </div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    if (!state) return;
    let obj = Map(state);
    let props = {
        tweets: (List(obj.get("timeLine")))
    }
    return props;
}

const TweetListWithStore = connect(mapStateToProps, null)(TweetList)


class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <TweetListWithStore />
            </Provider>
        );
    }
}

sagaMiddleware.run(tweetSaga);

store.dispatch(getTweets());

ReactDom.render(<Main></Main>, document.getElementById("react-container"));