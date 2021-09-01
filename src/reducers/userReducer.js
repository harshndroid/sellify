let INITIAL_STATE = {authorized: false};
const userInputReducer = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SIGNIN_USER':
      return {...state, authorized: action.payload};
    case 'SAVE_USER_INFO':
      console.log('=========', action.payload);
      return {
        ...state,
        user_id: action.payload.id,
        user_phoneNumber: action.payload.phone,
        user_type: action.payload.userType,
        user_notify_token: action.payload.notify_token,
        user_last_ordered_timestamp: action.payload.last_ordered_timestamp,
        user_request_status: action.payload.request_status,
      };
    case 'UPDATE_USER_INFO':
      let _state = {...state};
      _state['user_name'] = action.payload.name;
      _state['user_phoneNumber'] = action.payload.phone;
      _state['user_address'] = action.payload.address;
      return _state;
    default:
      return state;
  }
};

export default userInputReducer;
