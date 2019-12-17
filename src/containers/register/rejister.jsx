import React, {Component} from 'react';
import {
    NavBar,
    WingBlank,
    WhiteSpace,
    List,
    InputItem,
    Button,
    Radio
} from 'antd-mobile'
import Logo from 'components/logo/logo'
import './register.less'

const ListItem = List.Item;
const RadioItem = Radio.RadioItem;

class Rejister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            rePassword:'',
            select:'boss',
        }
    }

    handleChange = (type,val)=> {
        this.setState({
            [type]:val
        })
    }

    register = () => {
        console.log(this.state);
    }

    render() {
        const {select} = this.state
        return (
            <div style={{background:'#f1f1f1'}}>
                <NavBar mode="dark">阿里直聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem
                            type="text"
                            placeholder="用户名"
                            onChange={val=>this.handleChange('username',val)}
                        >用户名</InputItem>
                    </List>
                    <WhiteSpace />
                    <List>
                        <InputItem
                            type="password"
                            placeholder="密码"
                            onChange={val=>this.handleChange('password',val)}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            placeholder="确认密码"
                            onChange={val=>this.handleChange('rePassword',val)}
                        >确认密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <ListItem className='flex-radio'>
                        <span>用户类型:</span>
                        <Radio checked={select === 'boss'} onChange={val=>this.handleChange('select','boss')} >老板</Radio>
                        <Radio checked={select === 'manito'} onChange={val=>this.handleChange('select','manito')}>大神</Radio>
                    </ListItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.register}>注&nbsp;册</Button>
                    <WhiteSpace />
                    <Button type='ghost' onClick={()=>this.props.history.replace('/login')}>已有账号</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Rejister;