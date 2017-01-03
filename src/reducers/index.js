import login from './login';
import organizations from './organizations';

// redux's built-in combineReducers function scopes the state based on the reducer
// that modified it, which isn't a behavior i really like
function myCombineReducers(...reducers) {
  let reducer;
  let result;
  return function combined(state, action) {
    for (reducer of reducers) { // eslint-disable-line no-restricted-syntax
      result = reducer(state, action);
      if (result !== state) {
        return result;
      }
    }

    return state;
  };
}

export default myCombineReducers(login, organizations);
