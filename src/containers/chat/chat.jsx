import React, {Component} from 'react';
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg,readMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:'',
            targetId:'',
            sendId:'',
            isShowEmoji:false
        }

        this.emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
            .map(emoji =>({text:emoji}));

    }


    static getDerivedStateFromProps(props, state) {
        const targetId = props.match.params.targetId;
        const sendId = props.user._id;


        return {targetId,sendId}
    }

    componentDidMount() {
        window.scrollTo(0,document.body.scrollHeight)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        window.scrollTo(0,document.body.scrollHeight)
    }

    componentWillUnmount() {
        //退出当前组件 更新读取消息数
        const {sendId,targetId} = this.state
        this.props.readMsg(sendId,targetId)
    }


    sendMessage = () => {
        //收集数据
        const from = this.state.sendId;
        const to = this.state.targetId;
        const content = this.state.content.trim();

        //发送消息
        if(content) {
            this.props.sendMsg({from, to, content})
        }
        this.setState({content:'',isShowEmoji:false})
    }

    toggleShow = () => {
        this.setState(state=>({isShowEmoji:!state.isShowEmoji}),()=>{
            if(this.state.isShowEmoji) {
                setTimeout(()=>{
                    window.dispatchEvent(new Event('resize'))
                },0)
            }
        })
    }

    render() {

        const {users,chatMsgs} = this.props.chat;
        const {targetId,sendId} = this.state;
        if(!users[sendId]) return null // 如果还没有获取数据, 直接不做任何显示

        //过滤出当前用户的聊天信息
        const chatId = [targetId,sendId].sort().join('_');
        const messageList = chatMsgs.filter(msg=>chatId===msg.chat_id);

        const targetInfo = users[targetId];
        const targetAvatar = targetInfo.header ? require(`../../assets/images/headers/${targetInfo.header}.png`) : null;

        return (
            <div id='chat-page'>
                <NavBar icon={<Icon type='left'/>}
                        className='sticky-header'
                        onLeftClick={()=> this.props.history.goBack()}
                >{targetInfo.username}</NavBar>
                <List>

                    {
                        messageList.map(msg=>{
                            if (msg.to === sendId) {//对方
                                return (<Item thumb={targetAvatar} key={msg._id}>{msg.content}</Item>)
                            } else {//自己
                                return (<Item className='chat-me' extra='我' key={msg._id}>{msg.content}</Item>)
                            }
                        })
                    }
                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.content}
                        onChange={val => this.setState({content:val})}
                        onFocus={()=>this.setState({isShowEmoji:false})}
                        extra={
                            <>
                                <span onClick={this.toggleShow} style={{marginRight:5}}>😊</span>
                                <span onClick={()=> this.sendMessage()}>发送</span>
                            </>
                        }
                    />
                    {this.state.isShowEmoji && (<Grid
                        data={this.emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(item) => {
                            this.setState(state=>({content:state.content + item.text}))
                        }}
                    />)}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.User,chat:state.Chat}),
    {sendMsg,readMsg}
)(Chat);