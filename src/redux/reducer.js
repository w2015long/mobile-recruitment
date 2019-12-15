import {combineReducers} from 'redux';

import {
    SET_HEAD_TITLE,

} from "./action-types";


const initHederTitle = '111'

function headTitle(state = initHederTitle,action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.payload;
            break;
        default:
            return state
    }
}



export default combineReducers({
    headTitle,
})