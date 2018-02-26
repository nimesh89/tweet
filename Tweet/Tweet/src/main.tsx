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
import { Observable } from 'rxjs';

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
                    <img src={this.props.data.user.profile_image_url_https} />
                </a>
                <div className="tweet-container">
                    <div className="tw-header">
                        <h3 className="tw-heading">{this.props.data.user.name}</h3>
                        {this.props.data.verified && <span className="glyphicon glyphicon-certificate"><span className="glyphicon glyphicon-ok"></span></span>}
                        <span className="username u-dir u-textTruncate" data-toggle="popover" data-placement="bottom">@<span>{this.props.data.user.screen_name}</span></span>
                    </div>
                    <p className="tw-content">
                        {this.props.data.text}
                        </p>
                    {this.props.data.entities.media
                        && this.props.data.entities.media.length > 0
                        && <div className="tw-media"><img data-aria-label-part="" src={this.props.data.entities.media[0].media_url_https} alt="" /></div>}
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

let updater = Observable.interval(3000);
updater.subscribe(number => {
    store.dispatch(getTweets());
});

ReactDom.render(<Main></Main>, document.getElementById("react-container"));