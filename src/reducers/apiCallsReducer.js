const apiCallsReducer = function (state = {}, action) {
  switch (action.type) {
    case 'GETTING_OTP':
      return {...state, gettingOTP: action.payload};
    case 'CONFIRMING_OTP':
      return {...state, confirmingOTP: action.payload};
    case 'RAISING_PICKUP_REQUEST':
      return {...state, raisingPickupRequest: action.payload};
    default:
      return state;
  }
};

export default apiCallsReducer;
