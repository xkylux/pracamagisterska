import * as actionTypes from "../const/catConst";

export const getCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIRES_REQUEST:
      return {
        ...state,
        categories: action.payload,
      }
    case actionTypes.SAVE_ATTRIBUTES:
      return {
        ...state,
        categories: action.payload,
      }
    case actionTypes.NEW_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      }
    case actionTypes.REMOVE_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      }
    default:
      return state;
  }
}