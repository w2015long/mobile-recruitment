import React, {Component} from 'react';
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types';

class HeaderSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon:''
        }
        this.headerList = Array.from(new Array(12)).map((val, i) => ({
            icon: require(`assets/images/headers/头像${i+1}.png`),
            text: `头像${i+1}`,
        }));
    }

    handleSelect = ({icon,text}) => {
        this.setState({icon});
        //提交数据到父组件
        this.props.setHeader(text);
    }

    render() {
        const {icon} = this.state;

        let headerText;
        headerText = icon ? (<span>已选头像:<img src={icon} alt="头像"/></span>) : '请选择头像'

        return (
            <List renderHeader={() => headerText}>
                <Grid
                    data={this.headerList}
                    onClick={this.handleSelect}
                    columnNum={4} />
            </List>
        )
    }
}

HeaderSelector.propTypes = {
    setHeader:PropTypes.func.isRequired
}

export default HeaderSelector;