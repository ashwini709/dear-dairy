import ReactDOM from 'react-dom';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';

import App from './components/app.jsx';
import AppIndexRoute from './routes/app-index-route.jsx';
import NewEntryRoute from './routes/new-entry-route.jsx';
import EditEntryRoute from './routes/edit-entry-route.jsx';

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/new' component={NewEntryRoute} />
      <Route path='/entry/:id' component={EditEntryRoute} />
      <IndexRoute component={AppIndexRoute} />
    </Route>
  </Router>
);

const container = document.getElementById('container');

ReactDOM.render(routes, container);
