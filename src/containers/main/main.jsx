import React, {Component} from 'react';

import {Switch,Route,Redirect} from 'react-router-dom'
import Boss from '../boss-info/boss-info'
import Programmer from '../programmer-info/programmer-info'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/boss" component={Boss}/>
                    <Route path="/programmer" component={Programmer}/>
                </Switch>
            </div>
        )
    }
}

export default Main;