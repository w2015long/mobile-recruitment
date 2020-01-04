import {combineReducers} from 'redux';

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


const initChat = {
    users:{},// 所有用户信息的对象  属性名: userid, 属性值是: {username, header}
    chatMsgs:[],// sessionList当前用户所有相关msg的数组
    unreadCount:0
}

function Chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_SESSION_LIST:
            return Object.assign({},state,action.payload);
            break;
        case RECEIVE_MESSAGE:
            const {chatMsg,userid} = action.payload;
            const unread = !chatMsg.read && chatMsg.to===userid ? 1 : 0;
            // return Object.assign({},state,{chatMsgs:[...state.chatMsgs,chatMsg],unreadCount:state.unreadCount + unread})
            return {...state,chatMsgs:[...state.chatMsgs,chatMsg],unreadCount:state.unreadCount + unread};
            break;
        case READ_MESSAGE:
            const {from,to,count} = action.payload
            const chatMsgs = state.chatMsgs.map(msg=>{
                if (msg.from === from && msg.to === to && !msg.read) {
                    msg.read = true
                }
                return msg
            })
            return Object.assign({},state,{chatMsgs,unreadCount:state.unreadCount - count});
            break;
        default:
            return state
    }
}


export default combineReducers({
    User,
    UserList,
    Chat
})