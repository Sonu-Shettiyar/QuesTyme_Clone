import { ActionTypes } from "../../../Redux/AdminListByCategoryReducer/ActionTypes";
import { Dispatch } from "redux";
import axios from "axios";
import {
  adminListByCategoryFailure,
  adminListByCategoryLoading,
  adminListByCategorySuccess,
} from "../../../Redux/AdminListByCategoryReducer/Action";

export const getAlladminListByCategoryService =
  (type: string,token:string) =>
  (
    dispatch: Dispatch<adminListByCategorySuccess | adminListByCategoryFailure>
  ): Promise<void | ActionTypes> => {
    console.log("type",type)
    return axios
      .get(`http://35.178.167.63:8888/slot/get-all-available-admin/${type}`)
      .then((res) => {
        dispatch({
          type: ActionTypes.GET_ALL_ADMIN_LIST_BY_CATEGORY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.GET_ALL_ADMIN_LIST_BY_CATEGORY_FAILURE,
          payload: err,
        });
      });
  };
