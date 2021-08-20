const requestsReducer = function (state = [], action) {
  switch (action.type) {
    case 'SAVE_REQUESTS':
      return {...state, requestsList: action.payload};
    default:
      return state;
  }
};

export default requestsReducer;
