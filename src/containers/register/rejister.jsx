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
    Radio,
} from 'antd-mobile'
import Logo from 'components/logo/logo'
import {register} from '../../redux/actions';
import './register.less'

const ListItem = List.Item;

class Rejister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            rePassword:'',
            type:'boss',
        }
    }



    handleChange = (type,val)=> {
        this.setState({
            [type]:val
        })
    }


    register = () => {
        this.props.register(this.state);
    }

    render() {
        const {type} = this.state;
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
                        <InputItem
                            type="password"
                            placeholder="确认密码"
                            onChange={val=>this.handleChange('rePassword',val)}
                        >确认密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <ListItem className='flex-radio'>
                        <span>用户类型:</span>
                        <Radio checked={type === 'boss'} onChange={val=>this.handleChange('type','boss')} >老板</Radio>
                        <Radio checked={type === 'manito'} onChange={val=>this.handleChange('type','manito')}>大神</Radio>
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


export default connect(
    state => ({user:state.User}),
    {register}
)(Rejister);