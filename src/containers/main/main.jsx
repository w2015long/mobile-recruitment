import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Switch,Route,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'  // 可以操作前端cookie的对象 set()/get()/remove()

import BossInfo from '../boss-info/boss-info'
import ManitoInfo from '../manito-info/manito-info'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        // 读取cookie中的userid
        const userid = Cookies.get('userid');
        const {user} = this.props
        // 如果没有, 自动重定向到登陆界面
        if(!userid) {
            return <Redirect to='/login'/>
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
    null
)(Main);