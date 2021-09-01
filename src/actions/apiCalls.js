export function gettingOTP(data) {
  return {
    type: 'GETTING_OTP',
    payload: data,
  };
}

export function confirmingOTP(data) {
  return {
    type: 'CONFIRMING_OTP',
    payload: data,
  };
}

export function raisingPickupRequest(data) {
  return {
    type: 'RAISING_PICKUP_REQUEST',
    payload: data,
  };
}
