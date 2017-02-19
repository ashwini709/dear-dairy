import ReactDOM from 'react-dom';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';

import App from './components/app.jsx';
import AppIndexRoute from './routes/app-index-route.jsx';
import LoginRoute from './routes/login-route.jsx';
import NewEntryRoute from './routes/new-entry-route.jsx';
import EditEntryRoute from './routes/edit-entry-route.jsx';
import SignupRoute from './routes/signup-route.jsx';

import appState from './states/app.js';

function requirePassword(nextState, replace) {
  if (!appState.sessionAuthenticated.length) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/signup' component={SignupRoute} />
      <Route path='/login' component={LoginRoute} />
      <Route path='/new' component={NewEntryRoute} onEnter={requirePassword} />
      <Route path='/entry/:id' component={EditEntryRoute} onEnter={requirePassword} />
      <IndexRoute component={AppIndexRoute} onEnter={requirePassword} />
    </Route>
  </Router>
);

const container = document.getElementById('container');

ReactDOM.render(routes, container);
