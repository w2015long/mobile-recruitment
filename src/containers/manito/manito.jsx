import React, {Component} from 'react';
import {connect} from 'react-redux'
import UserList from 'components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Manito extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getUserList('boss');
    }

    render() {
        const {userList} = this.props.UserList
        return <UserList userList = {userList}/>
    }

}

export default connect(
    state => ({UserList:state.UserList}),
    {getUserList}
)(Manito);