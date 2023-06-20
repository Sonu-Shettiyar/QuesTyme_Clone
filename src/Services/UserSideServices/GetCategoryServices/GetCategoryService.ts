import { Action, categoryDataFailure, categoryDataLoading, categoryDataSuccess } from "../../../Redux/CategoryReducer/Action";
import { ActionTypes } from "../../../Redux/CategoryReducer/ActionTypes";
import { Dispatch } from "redux";
import axios from "axios";
export const getAllCategoryDataService =(token:string)=>(dispatch:Dispatch<categoryDataSuccess|categoryDataLoading|categoryDataFailure>):Promise<void | ActionTypes>=>{

    return axios.get("http://35.178.167.63:8888/api/category/",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        dispatch({type:ActionTypes.GET_CATEGORY_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        dispatch({type:ActionTypes.GET_CATEGORY_FAILURE,payload:err})

    })

}