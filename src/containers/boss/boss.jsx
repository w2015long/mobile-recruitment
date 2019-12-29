import React, {Component} from 'react';
import {connect} from 'react-redux'
import UserList from 'components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getUserList('manito');
    }

    render() {
        const {userList} = this.props.UserList
        return <UserList userList = {userList}/>
    }
}

export default connect(
    state => ({UserList:state.UserList}),
    {getUserList}
)(Boss);