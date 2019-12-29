import {Toast} from 'antd-mobile'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    REST_USER,
    RECEIVE_USER_LIST,
} from "./action-types";

import {
    reqLogin,
    reqRegister,
    reqUpdateUser,
    reqUser,
    reqUserList
} from 'api';

//授权登录action
const authSuccess = user => ({type:AUTH_SUCCESS,payload:user});
//登录/注册失败action
const errorMsg = msg => ({type:ERROR_MSG,payload:msg});

//提交表单成功 更新用户信息
const receiveUser = user => ({type:RECEIVE_USER,payload:user});

//提交表单成功 重置用户信息
export const resetUser = user => ({type:REST_USER,payload:user});

const receiveUserList = userList => ({type:RECEIVE_USER_LIST,payload:userList})

//注册
export const register = user => {
    //表单验证
    const {username,password,rePassword} = user;
    if (!username) {
        Toast.fail('请输入用户名')
        return errorMsg('请输入用户名');
    } else if (!password) {
        Toast.fail('请输入密码')
        return errorMsg('请输入密码');
    } else if (password !== rePassword) {
        Toast.fail('两次密码前后不一致')
        return errorMsg('两次密码前后不一致');
    }

    return async dispatch => {
        const ret = await reqRegister(user);
        if (ret.code===0) {//成功
            dispatch(authSuccess(ret.data));
        } else {
            Toast.fail(ret.msg)
        }

    }
}


//登录
export const login = user => {
    //表单验证
    const {username,password} = user;
    if (!username) {
        Toast.fail("请输入用户名")
        return errorMsg('请输入用户名');
    } else if (!password) {
        Toast.fail('请输入密码')
        return errorMsg('请输入密码');
    }

    return async dispatch => {
        const ret = await reqLogin(username,password);
        if (ret.code===0) {//成功
            dispatch(authSuccess(ret.data));
        } else {
            Toast.fail(ret.msg);
        }

    }
}

//提交用户信息
export const updateUser = user => {
    return async dispatch => {
        const ret = await reqUpdateUser(user);
        if (ret.code === 0) {//成功
            dispatch(receiveUser(ret.data));
        } else {
            dispatch(resetUser(ret.msg));
        }

    }
}

//获取用户信息
export const getUserInfo = () => {
    return async dispatch => {
        const ret = await reqUser();
        if (ret.code === 0) {//成功
            dispatch(receiveUser(ret.data));
        } else {
            dispatch(resetUser(ret.msg));
        }

    }

}

//获取用户列表
export const getUserList = type => {
    return async dispatch => {
        const ret = await reqUserList(type);
        if (ret.code === 0) {//成功
            dispatch(receiveUserList(ret.data));
        }
    }
}


