import {combineReducers} from 'redux';

import {
    AUTH_SUCCESS,
    ERROR_MSG,

} from "./action-types";


const initUser = {
    username: '', // 用户名
    type: '', // 用户类型 manito/boss
    msg: '', // 错误提示信息
    redirectTo: '' // 需要自动重定向的路由路径
}

function User(state = initUser,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state,...action.payload,redirectTo:'/'};
            break;
        case ERROR_MSG:
            return {...state,msg:action.payload};
            break;
        default:
            return state
    }
}



export default combineReducers({
    User,
})