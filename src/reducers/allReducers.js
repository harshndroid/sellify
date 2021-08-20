import {combineReducers} from 'redux';
import userType from './userTypeReducer';
import user from './userReducer';
import item from './itemReducer';
import selectedCategories from './selectedCategoriesReducer';
import selectedItems from './selectedItemsReducer';
import requests from './requestsReducer';
import buyers from './buyersReducer';
import apiCalls from './apiCallsReducer';

const appReducer = combineReducers({
  userType,
  user,
  item,
  selectedCategories,
  selectedItems,
  requests,
  buyers,
  apiCalls,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
