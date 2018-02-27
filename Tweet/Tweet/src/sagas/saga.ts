import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { GET_TIMELINE, TIMELINE_RESPONSE_RECIEVED, TIMELINE_REQUEST_FAILED } from "../eventNames";
import { tweetsRecieved } from "../actions";
import 'isomorphic-fetch';

function fetchPost(latest: number) {
    return fetch((`${window.location.protocol}//${window.location.host}/Home/TimeLine` + ((latest != null || latest > 0) ? `?newer=${latest}` : '')), {
        credentials: "same-origin"
    })
        .then(resp => resp.json())
        .then(json => json);
}

function* fetchTimeLine(action) {
    const posts = yield call(fetchPost, action.latest);
    yield put(tweetsRecieved(posts));
}

export function* tweetSaga() {
    yield takeLatest(GET_TIMELINE, fetchTimeLine);
}

