export function setSelectedCategories(data) {
  return {
    type: 'SET_SELECTED_CATEGORIES',
    payload: data,
  };
}

export function resetSelectedCategories() {
  return {
    type: 'RESET_SELECTED_CATEGORIES',
  };
}
