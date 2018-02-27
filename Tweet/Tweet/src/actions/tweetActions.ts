import { GET_TIMELINE, TIMELINE_RESPONSE_RECIEVED, TIMELINE_REQUEST_FAILED } from "../eventNames";

export function getTweets(max: number) {
    return {
        type: GET_TIMELINE,
        latest: max
    };
}

export function tweetsRecieved(tweets) {
    return {
        type: TIMELINE_RESPONSE_RECIEVED,
        tweets: tweets
    };
}