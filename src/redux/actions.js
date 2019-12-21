
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from "./action-types";

import {
    reqLogin,
    reqRegister,
    reqUpdateUser
} from 'api';

//授权登录
const authSuccess = user => ({type:AUTH_SUCCESS,payload:user});
//登录/注册失败
const errorMsg = msg => ({type:ERROR_MSG,payload:msg});

export const register = user => {
    //表单验证
    const {username,password,rePassword} = user;
    if (!username) {
        return errorMsg('请输入用户名');
    } else if (!password) {
        return errorMsg('请输入密码');
    } else if (password !== rePassword) {
        return errorMsg('两次密码前后不一致');
    }

    return async dispatch => {
        const ret = await reqRegister(user);
        if (ret.code===0) {//成功
            dispatch(authSuccess(ret.data));
        } else {
            dispatch(errorMsg(ret.msg));
        }

    }
}

export const login = user => {
    //表单验证
    const {username,password} = user;
    if (!username) {
        return errorMsg('请输入用户名');
    } else if (!password) {
        return errorMsg('请输入密码');
    }

    return async dispatch => {
        const ret = await reqLogin(user);
        if (ret.code===0) {//成功
            dispatch(authSuccess(ret.data));
        } else {
            dispatch(errorMsg(ret.msg));
        }

    }
}
