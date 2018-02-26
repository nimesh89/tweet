import { List, Map } from 'immutable';
import * as eventTypes from '../eventNames';

export function tweetReducer(state = Map({ timeLine: List([]) }), action) {
    switch (action.type) {
        case eventTypes.TIMELINE_RESPONSE_RECIEVED:
            return state.set("timeLine", List(action.tweets))
        default:
            return state;
    }
};