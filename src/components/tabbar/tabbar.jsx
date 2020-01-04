import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'

class FootNav extends Component {

    render() {
        const {navList,unreadCount} = this.props;
        const path = this.props.location.pathname;

        return (
            <TabBar>
                {navList.map(nav => <TabBar.Item
                    key={nav.path}
                    badge={ nav.path === '/message' && unreadCount}
                    title={nav.text}
                    icon={{uri: require(`./images/${nav.icon}.png`)}}
                    selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                    selected={nav.path == path}
                    onPress={()=> this.props.history.replace(nav.path)}
                />)}
            </TabBar>
        )
    }
}


FootNav.propTypes = {
    navList:PropTypes.array.isRequired,
    unreadCount:PropTypes.number.isRequired
}

export default withRouter(FootNav)


