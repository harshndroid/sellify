const userTypeReducer = function (state = {userType: 'seller'}, action) {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return {...state, userType: action.payload};
    default:
      return state;
  }
};

export default userTypeReducer;
