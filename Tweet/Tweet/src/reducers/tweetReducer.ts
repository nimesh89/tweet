import { List, Map } from 'immutable';
import * as eventTypes from '../eventNames';

export function tweetReducer(state = Map({ timeLine: List([]) }), action) {
    switch (action.type) {
        case eventTypes.TIMELINE_RESPONSE_RECIEVED:
            var val = state.set("timeLine", List());
            if (action.tweets.errors) return val.set("errors", List(action.tweets.errors))
            return state.set("timeLine", List(action.tweets))
        default:
            return state;
    }
};