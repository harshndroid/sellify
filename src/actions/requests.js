export function saveRequests(data) {
  return {
    type: 'SAVE_REQUESTS',
    payload: data,
  };
}
