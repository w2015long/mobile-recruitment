import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Switch,Route,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'  // 可以操作前端cookie的对象 set()/get()/remove()
import {NavBar} from 'antd-mobile'

import BossInfo from '../boss-info/boss-info'
import ManitoInfo from '../manito-info/manito-info'
import Manito from '../manito/manito'
import Boss from '../boss/boss'
import Message from '../message/message'
import Profile from '../profile/profile'
import NoFound from 'components/not-found/not-found'
import TabBar from 'components/tabbar/tabbar'
import Chat from '../chat/chat'

import {getRedirectTo} from "../../utils";
import {getUserInfo} from '../../redux/actions'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: '老板列表',
            icon: 'dashen',
            text: '老板',
        },
        {
            path: '/manito', // 路由路径
            component: Manito,
            title: '大神列表',
            icon: 'laoban',
            text: '大神',
        },
        {
            path: '/message',
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/profile', // 路由路径
            component: Profile,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        const userid = Cookies.get('userid');
        const {user} = this.props;
        if (userid && !user._id) {
            this.props.getUserInfo()
        }
    }

    render() {
        // 读取cookie中的userid
        const userid = Cookies.get('userid');
        let path = this.props.location.pathname;
        const {user} = this.props
        // 如果没有, 自动重定向到登陆界面
        if(!userid) {
            return <Redirect to='/login'/>
        } else {
            if (!user._id) {//cookise 有userid && redux 没有user._id
                return null
            } else {//cookise 有userid && redux 有user._id 时重定向到对应页面
                if (path === '/') {
                    path = getRedirectTo(user.type,user.header);
                    return <Redirect to={path}/>
                }
            }

        }

        if (user.type == 'boss') {//判断当前登录用户类型
            this.navList[1].hidden = true
        } else {
            this.navList[0].hidden = true
        }

        const currentNav = this.navList.find(nav => nav.path === path);

        const footNav = this.navList.filter(nav => !nav.hidden);

        return (
            <div>
                {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        this.navList.map(nav => <Route path={nav.path} component={nav.component} key={nav.path} />)
                    }
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/manitoinfo" component={ManitoInfo}/>
                    <Route path="/chat/:targetId" component={Chat}/>
                    <Route component={NoFound}/>
                </Switch>
                {currentNav ? <TabBar navList = {footNav} /> : null}
            </div>
        )
    }
}

export default connect(
    state => ({user:state.User}),
    {getUserInfo}
)(Main);