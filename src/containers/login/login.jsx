import React, {Component} from 'react';
import {
    NavBar,
    WingBlank,
    WhiteSpace,
    List,
    InputItem,
    Button,
} from 'antd-mobile'
import Logo from 'components/logo/logo'

const ListItem = List.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
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
                    </List>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.register}>登&nbsp;陆</Button>
                    <WhiteSpace />
                    <Button type='ghost' onClick={()=>this.props.history.replace('/register')}>注&nbsp;册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;