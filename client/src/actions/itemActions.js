import axios from "axios";
import * as types from "./types";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get("/api/items").then((res) =>
    dispatch({
      type: types.GET_ITEMS,
      payload: res.data,
    })
  );
};

export const deleteItem = (id) => (dispatch) => {
  axios.delete(`/api/items/${id}`).then((res) =>
    dispatch({
      type: types.DELETE_ITEM,
      payload: id,
    })
  );
};

export const addItem = (item) => (dispatch) => {
  axios.post("/api/items", item).then((res) =>
    dispatch({
      type: types.ADD_ITEM,
      payload: res.data,
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: types.ITEMS_LOADING,
  };
};
