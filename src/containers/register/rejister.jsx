import React, {Component} from 'react';
import {
    WingBlank,
    WhiteSpace,
    List,
    InputItem,
    Button,

} from 'antd-mobile'
import Logo from 'components/logo/logo'

const Item = List.Item;

class Rejister extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Logo />
                <List>
                    <InputItem
                        type="text"
                        placeholder="用户名"
                    >用户名</InputItem>
                </List>
            </div>
        )
    }
}

export default Rejister;