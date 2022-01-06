const initialState = { favFilmsID: [] }

function favFilms(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_FILM':
      console.log(nextState);
      nextState = {
        ...state,
        favFilmsID: [...state.favFilmsID, action.value]
      };
      return nextState || state
    case 'UNSAVE_FILM':
      nextState = {
        ...state,
        favFilmsID: state.favFilmsID.filter(id => id !== action.value)
      };
      return nextState || state
    default:
      return state
  };
}

export default favFilms;