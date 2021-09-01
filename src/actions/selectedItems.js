export function setSelectedItems(data) {
  return {
    type: 'SET_SELECTED_ITEMS',
    payload: data,
  };
}
export function resetSelectedItems() {
  return {
    type: 'RESET_SELECTED_ITEMS',
  };
}
