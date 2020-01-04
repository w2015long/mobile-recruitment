import {Toast} from 'antd-mobile'
import io from 'socket.io-client'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    REST_USER,
    RECEIVE_USER_LIST,
    RECEIVE_SESSION_LIST,
    RECEIVE_MESSAGE,
    READ_MESSAGE
} from "./action-types";

import {
    reqLogin,
    reqRegister,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqSessionList,
} from 'api';
import {reqReadMsg} from "../api";

function initIo(dispatch, userid) {
    if (!io.socket) {
        // 连接服务器, 得到与服务器的连接对象
        io.socket = io('ws://localhost:4000')  // 2. 创建对象之后: 保存对象
        io.socket.on('receiveMsg',(chatMsg)=>{
            console.log('客户端接收服务器发送的消息', chatMsg);
            // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
            if(userid===chatMsg.from || userid===chatMsg.to) {
                dispatch(receiveMsg(chatMsg, userid))
            }

        })
    }
}

async function getSessionList(dispatch,userid) {
    initIo(dispatch,userid);
    const ret = await reqSessionList();
    if (ret.code===0) {//成功
        const {users, chatMsgs} = ret.data
        const unreadCount = chatMsgs.reduce((preTotal,msg)=>{
            if (!msg.read && msg.to === userid) {
                preTotal++
            }
            return preTotal
        },0)
        dispatch(receiveSessionList({users, chatMsgs,unreadCount}));
    } else {
        Toast.fail(ret.msg)
    }

}

//授权登录action
const authSuccess = user => ({type:AUTH_SUCCESS,payload:user});
//登录/注册失败action
const errorMsg = msg => ({type:ERROR_MSG,payload:msg});

//提交表单成功 更新用户信息
const receiveUser = user => ({type:RECEIVE_USER,payload:user});

//提交表单成功 重置用户信息
export const resetUser = user => ({type:REST_USER,payload:user});

const receiveUserList = userList => ({type:RECEIVE_USER_LIST,payload:userList})

//接收会话列表
const receiveSessionList = ({users, chatMsgs, unreadCount}) => ({type:RECEIVE_SESSION_LIST,payload:{users, chatMsgs, unreadCount}})

//客服端接收服务器发送的消息
const receiveMsg = (chatMsg, userid) => ({type:RECEIVE_MESSAGE,payload:{chatMsg, userid}});

//更新已读状态
const readMessage = ({from,to,count}) => ({type:READ_MESSAGE,payload:{from,to,count}})


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
            getSessionList(dispatch,ret.data._id);
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
            getSessionList(dispatch,ret.data._id);
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
            getSessionList(dispatch,ret.data._id);
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

//send消息
export const sendMsg = ({from,to,content}) => {
    return dispatch => {
        console.log('客户端向服务器发送消息', {from, to, content})
        // 发消息
        io.socket.emit('sendMsg', {from, to, content})
    }

}

//read message
export const readMsg = (sendId,targetId) => {
    return async dispatch => {
        const ret = await reqReadMsg(targetId);
        if (ret.code === 0) {//成功
            dispatch(readMessage({from:sendId,to:targetId,count:ret.data}));
        }
    }
}



