import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

import { getLatestMessageList } from 'utils'

const Item = List.Item
const Brief = Item.Brief
class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {

        const { user } = this.props;
        const { users, chatMsgs } = this.props.chat;

        const latestMessageList = getLatestMessageList(chatMsgs);

        return (
            <List>
                {
                    latestMessageList.map(msg => {
                        const targetId = msg.to === user._id ? msg.from : msg.to;
                        const targetInfo = users[targetId];
                        const targetAvatar = targetInfo.header && require(`../../assets/images/headers/${targetInfo.header}.png`);
                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={1} />}
                                thumb={targetAvatar}
                                arrow='horizontal'
                                onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                            >
                                {msg.content}
                                <Brief>{targetInfo.username}</Brief>
                            </Item>
                        )
                    })
                }

            </List>
        )
    }
}


export default connect(
    state => ({ user: state.User, chat: state.Chat }),
    {}
)(Message);