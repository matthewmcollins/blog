import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions/';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case FETCH_POSTS:
      // lodash mapKeys takes an array of objects and will
      // return an object keyed by the second parameter
      // [{"id":"4", "text":"hello"}, {"id":"5", "text":"goodbye"}]
      //   => {"4": {"id":"4", "text":"hello"}, "5": {"id":"5", "text":"goodbye"} }
      return _.mapKeys(payload.data, 'id');
    case FETCH_POST:
      return { ...state, [payload.data.id]: payload.data };
    case DELETE_POST:
      // returns new array with id removed
      return _.omit(state, payload);
    default:
      return state;
  }
};
