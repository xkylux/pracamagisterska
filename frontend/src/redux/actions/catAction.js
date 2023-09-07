import * as actionTypes from "../const/catConst";
import axios from "axios";

export const getCategories = () => async (dispatch) => {
  const { data } = await axios.get("/api/kategorie");
  dispatch({
    type: actionTypes.GET_CATEGORIRES_REQUEST,
    payload: data,
  })
}

export const updateCategoryMongoDb = (key, val, categoryChoosen) => async (dispatch, getState) => {
  const { data } = await axios.post("/api/kategorie/atrybut", { key, val, categoryChoosen });
  if (data.updateCategory) {
    dispatch({
      type: actionTypes.SAVE_ATTRIBUTES,
      payload: [...data.updateCategory],
    })
  }
}

export const newCategory = (category) => async (dispatch, getState) => {
  const catego = getState().getCategories.categories;
  const { data } = await axios.post("/api/kategorie", { category });
  if (data.categoryCreated) {
    dispatch({
      type: actionTypes.NEW_CATEGORY,
      payload: [...catego, data.categoryCreated],
    })
  }
}

export const removeCategory = (category) => async (dispatch, getState) => {
  const catego = getState().getCategories.categories;
  const categories = catego.filter((item) => item.name !== category);
  const { data } = await axios.delete("/api/kategorie/" + encodeURIComponent(category));
  if (data.categoryDeleted) {
    dispatch({
      type: actionTypes.REMOVE_CATEGORY,
      payload: [...categories],
    })
  }
}
