import {Dispatch} from "redux";
import axios from "axios"
import {Action, ActionTypes} from "../types/ActionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';


const apiUrl = "192.168.1.80:8080";

export const Register = (username: string, email: string, password: string) => async (dispatch: Dispatch<Action>) => {
    try {
       const response = await axios.post(`http://${apiUrl}/auth/register`, {
           username,
           email,
           password,
       }).then(el => {
           console.log(el.status, el.data, 1444)
           dispatch({type: ActionTypes.Register, payload: {statusCode: el.status, data:el.data}})
       })
        console.log("Register", `${apiUrl}/register`)

    } catch (ex) {
        console.log("register ex", ex)
    }
}


export const Setup = (username: {data: string}, full_name: string, location: string, description: string, gender: string) => async (dispatch: Dispatch<Action>) => {
    console.log(username, 5555)
    await axios.post(`http://${apiUrl}/auth/setup`, {
        username:username.data,
        full_name:full_name,
        location:location,
        description:description,
        gender:gender,
    }).then((el) => {
        console.log(el.status, el.data, 1444)
        dispatch({type: ActionTypes.Setup, payload: {statusCode: el.status, data: el.data.data}})
    })
}


export const Login = (username: string, password: string) => async (dispatch: Dispatch<Action>) => {
        await axios.post(`http://${apiUrl}/auth/login`, {

        })
}


export const Clear = () => {
    return {
        type: ActionTypes.Clear,
    }
}


