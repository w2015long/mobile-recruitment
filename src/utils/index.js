
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

const getLatestMessageList = msgList => {
    let latestMessages = {}
    msgList.forEach(msg =>{
        const chatId = msg.chat_id
        let latestMsg = latestMessages[chatId];
        if (!latestMsg) {//没有存储最新消息
            latestMessages[chatId] = msg
        } else {//之前有做存储最新消息
            //更新为最新消息
            if (latestMsg.create_time < msg.create_time) {
                latestMessages[chatId] = msg
            }
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