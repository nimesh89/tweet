import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { GET_TIMELINE, TIMELINE_RESPONSE_RECIEVED, TIMELINE_REQUEST_FAILED } from "../eventNames";
import 'isomorphic-fetch';

function fetchPost() {
    return fetch(`${window.location.protocol}//${window.location.host}/Home/TimeLine`, {
        credentials: "same-origin"
    })
        .then(resp => resp.json())
        .then(json => json);
}

function* fetchTimeLine(action) {
    const posts = yield call(fetchPost);
    console.log(posts);
}

export function* tweetSaga() {
    yield takeLatest(GET_TIMELINE, fetchTimeLine);
}

