import { List, Map } from 'immutable';
import * as eventTypes from '../eventNames';

export function tweetReducer(state = Map<string, any>({
    timeLine: List<any>([]),
    errors: List<any>([]),
    tweetlatest: null
}), action) {
    switch (action.type) {
        case eventTypes.TIMELINE_RESPONSE_RECIEVED:
            var val = state.set("timeLine", List());
            if (action.tweets.errors) return val.set("errors", List(action.tweets.errors));
            var latest = List<any>(action.tweets);
            var old = state.get("timeLine");
            var oldlatestid = (old.first() || { id : null }).id;
            let distinctList = latest.filter(x => x.id != oldlatestid).concat(old)
                .toSet()
                .toList()
                .sort((a, b) => a.id > b.id ? 1 : b.id > a.id ? -1 : 0)
                .reverse();
            return state.withMutations(map => {
                map.set("timeLine", distinctList)
                    .set("tweetlatest", (distinctList.first() || { id: null }).id);
            });
        default:
            return state;
    }
};