
function getRedirectTo(type,header) {
    let path;
    if (type === 'boss') {
        path = 'boss';
    } else {
        path = 'manito';
    }

    if (!header) {
        path += 'info'
    }
    return path
}

const getLatestMessageList = (msgList,userid) => {
    let latestMessages = {}
    console.log("getLatestMessageList>>>>>>>");
    msgList.forEach(msg =>{

        //每一条消息存储一个未读字段
        msg.unreadCount = !msg.read && msg.to===userid ? 1 : 0;

        const chatId = msg.chat_id
        let latestMsg = latestMessages[chatId];
        if (!latestMsg) {//没有存储最新消息
            latestMessages[chatId] = msg
        } else {//之前有做存储这个会话关系(chatId)
            const {unreadCount} = latestMsg;
            //更新为最新消息
            if (latestMsg.create_time < msg.create_time) {
                latestMessages[chatId] = msg
            }
            //累加这条会话 的未读数
            latestMessages[chatId].unreadCount = msg.unreadCount + unreadCount
        }
    });

    //返回最新消息数组
    const latestMsgList = Object.values(latestMessages).sort((n1,n2)=>n2.create_time-n1.create_time);

    return latestMsgList;
}

export {
    getRedirectTo,
    getLatestMessageList
}