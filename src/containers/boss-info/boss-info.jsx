import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    NavBar,
    WingBlank,
    WhiteSpace,
    InputItem,
    Button,
    TextareaItem
} from 'antd-mobile'

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

    handleChange = (key,val) => {
        this.setState({
            [key]: val
        })
    }

    render() {
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <WingBlank>
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
    state => ({}),
    {}
)(Boss);