const itemReducer = function (state = {}, action) {
  switch (action.type) {
    case 'SAVE_ITEMS':
      return {...state, itemList: action.payload};
    case 'SAVE_CATEGORIES':
      return {...state, categoryList: action.payload};
    case 'SAVE_SUB_CATEGORIES':
      return {...state, subCategoryList: action.payload};
    default:
      return state;
  }
};

export default itemReducer;
