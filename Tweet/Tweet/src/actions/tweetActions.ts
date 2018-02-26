import { GET_TIMELINE, TIMELINE_RESPONSE_RECIEVED, TIMELINE_REQUEST_FAILED } from "../eventNames";

export function getTweets() {
    return {
        type: GET_TIMELINE
    };
}