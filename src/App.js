import React from 'react';
import { HashRouter, Route, Switch} from 'react-router-dom'
import Register from 'containers/register/rejister'
import Login from 'containers/login/login'
import Main from 'containers/main/main'

import './assets/css/index.less'

function App() {
  return (
      <HashRouter>
          <Switch>
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <Route component={Main} />
          </Switch>
      </HashRouter>
  );
}

export default App;
