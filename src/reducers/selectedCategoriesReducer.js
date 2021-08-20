const selectedCategoriesReducer = function (state = [], action) {
  switch (action.type) {
    case 'SET_SELECTED_CATEGORIES':
      if (action.payload.isSelected === false) {
        let arr = state.filter(
          item => item.categoryId !== action.payload.categoryId,
        );
        return arr;
      }
      return [...state, action.payload];
    default:
      return state;
  }
};

export default selectedCategoriesReducer;
