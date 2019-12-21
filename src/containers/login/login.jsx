import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
    NavBar,
    WingBlank,
    WhiteSpace,
    List,
    InputItem,
    Button,
    Toast
} from 'antd-mobile'
import Logo from 'components/logo/logo'
import {login} from "../../redux/actions";

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

    login = () => {
        this.props.login(this.state);
        setTimeout(()=>{
            const {msg} = this.props.user;
            if (msg) {
                Toast.fail(msg);
            }
        },0)
    }

    render() {
        const {redirectTo} = this.props.user;
        if (redirectTo) {
            return <Redirect to={redirectTo} />
        }
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
                    <Button type='primary' onClick={this.login}>登&nbsp;陆</Button>
                    <WhiteSpace />
                    <Button type='ghost' onClick={()=>this.props.history.replace('/register')}>注&nbsp;册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.User}),
    {login}
)(Login);