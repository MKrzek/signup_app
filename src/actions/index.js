import axios from "axios";
import { SAVE_COMMENT, FETCH_COMMENTS, CHANGE_AUTH } from "./types";

export function saveComment(comment) {
  return {
    type: SAVE_COMMENT,
    payload: comment
  };
}
export function fetchComment() {
  const response = axios.get("http://jsonplaceholder.typicode.com/comments");
  console.log("response", response);
  return {
    type: FETCH_COMMENTS,
    payload: response
  };
}
export function changeAuth(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}