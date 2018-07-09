import { FETCH_COMMENTS } from "../actions/types";

export default function comments(state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      const comments = action.payload.data.map(comment => comment.name);
      return [...state, ...comments];
    default:
      return state;
  }
}
