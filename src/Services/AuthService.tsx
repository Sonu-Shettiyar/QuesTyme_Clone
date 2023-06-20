import axios from "axios";

import { Dispatch } from "redux";
import {Action, isLoginFailure, isLoginSuccess} from "../Redux/AuthReducer/Action"
import {ActionTypes} from "../Redux/AuthReducer/ActionTypes"
import { LoginData } from "../Pages/Login/LoginUser";

export const loginService =(payload:LoginData)=>(dispatch:Dispatch<isLoginSuccess|isLoginFailure>):Promise<void | ActionTypes>=>{

 return axios.post("http://35.178.167.63:8888/auth/login",payload).then((res)=>{
  dispatch({type:ActionTypes.LOGIN_SUCCESS,payload:res.data})
  return ActionTypes.LOGIN_SUCCESS
 })
 .catch((err)=>{
  dispatch({type:ActionTypes.LOGIN_ERROR,payload:err})
 })

}