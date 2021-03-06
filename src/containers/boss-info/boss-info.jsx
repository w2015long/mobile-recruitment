import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
    NavBar,
    WingBlank,
    WhiteSpace,
    InputItem,
    Button,
    TextareaItem
} from 'antd-mobile'

import {updateUser} from '../../redux/actions'

import HeaderSelector from 'components/header-selector/header-selector'

class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: '',
            post: '',
            info: '',
            company: '',
            salary: '',
        }
    }
    //数据双向绑定
    handleChange = (key,val) => {
        this.setState({
            [key]: val
        })
    }
    //子组件传递数据到父组件
    setHeader = header => {
        this.setState({header})
    }

    //保存表单数据
    save = () => {
        this.props.updateUser(this.state)
    }

    render() {
        const {type,header} = this.props.user;
        if (header) {//信息已经完善 重定向到主页面
            const path = type === 'boss' ? '/boss' : '/manito'
            return <Redirect to={path} />
        }
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <WingBlank>
                    <WhiteSpace />
                    <HeaderSelector setHeader={this.setHeader}/>
                    <WhiteSpace />
                    <InputItem
                        placeholder='请输入招聘职位'
                        onChange={val => {this.handleChange('post', val)}}
                    >招聘职位:</InputItem>
                    <WhiteSpace />
                    <InputItem
                        placeholder='请输入公司名称'
                        onChange={val => {this.handleChange('company', val)}}
                    >公司名称:</InputItem>
                    <WhiteSpace />
                    <InputItem
                        placeholder='请输入职位薪资'
                        onChange={val => {this.handleChange('salary', val)}}
                    >职位薪资:</InputItem>
                    <WhiteSpace />
                    <TextareaItem
                        title="职位要求:"
                        placeholder='请输入个人介绍'
                        rows={3}
                        onChange={val => {this.handleChange('info', val)}}
                    />
                    <WhiteSpace />
                    <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.User}),
    {updateUser}
)(Boss);