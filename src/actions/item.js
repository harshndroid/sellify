export function saveItems(data) {
  return {
    type: 'SAVE_ITEMS',
    payload: data,
  };
}
export function saveCategories(data) {
  return {
    type: 'SAVE_CATEGORIES',
    payload: data,
  };
}
export function saveSubCategories(data) {
  return {
    type: 'SAVE_SUB_CATEGORIES',
    payload: data,
  };
}
