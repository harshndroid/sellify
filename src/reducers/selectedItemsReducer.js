const selectedItemsReducer = function (state = [], action) {
  switch (action.type) {
    case 'SET_SELECTED_ITEMS':
      if (action.payload.isSelected === false) {
        let arr = state.filter(item => item.itemId !== action.payload.itemId);
        return arr;
      }
      return [...state, action.payload];
    case 'RESET_SELECTED_ITEMS':
      return [];
    default:
      return state;
  }
};

export default selectedItemsReducer;
