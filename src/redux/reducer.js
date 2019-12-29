import {combineReducers} from 'redux';

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    REST_USER,
    RECEIVE_USER_LIST,
} from "./action-types";

import {getRedirectTo} from 'utils'


const initUser = {
    username: '', // 用户名
    type: '', // 用户类型 manito/boss
    msg: '', // 错误提示信息
    redirectTo: '' // 需要自动重定向的路由路径
}

function User(state = initUser,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type,header} = action.payload;
            return {...state,...action.payload,redirectTo:getRedirectTo(type,header)};
            break;
        case ERROR_MSG:
            return {...state,msg:action.payload};
            break;
        case RECEIVE_USER:
            return {...state,...action.payload};
            break;
        case REST_USER:
            return {...initUser,msg:action.payload};
            break;
        default:
            return state
    }
}

const initUserList = {
    userList:[]
}

function UserList(state = initUserList,action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return {...state,userList:action.payload};
            break;
        default:
            return state
    }
}



export default combineReducers({
    User,
    UserList
})