import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Switch,Route,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'  // 可以操作前端cookie的对象 set()/get()/remove()

import BossInfo from '../boss-info/boss-info'
import ManitoInfo from '../manito-info/manito-info'

import {getRedirectTo} from "../../utils";
import {getUserInfo} from '../../redux/actions'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

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
        return (
            <div>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/manitoinfo" component={ManitoInfo}/>
                </Switch>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.User}),
    {getUserInfo}
)(Main);