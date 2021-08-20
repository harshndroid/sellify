const buyersReducer = function (state = [], action) {
  switch (action.type) {
    case 'SAVE_BUYERS':
      return {...state, buyersList: action.payload};
    default:
      return state;
  }
};

export default buyersReducer;
