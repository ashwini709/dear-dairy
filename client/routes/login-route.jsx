import cookie from 'react-cookie';
import { withRouter } from 'react-router';

import config from '../config/environment.js';

import LoginView from '../components/login-view.jsx';

import makeRequestStore from '../stores/make-request.js';

const loginUrl = config.serverUrl + '/login';

class LoginRoute extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: null,
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (cookie.load('sessionAuthenticated')) {
      const afterLogin = this.props.location.state ? this.props.location.state.nextPathname : '/';

      return this.props.router.push(afterLogin);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const { email, password } = this.state;

    return makeRequestStore.find(loginUrl, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }).then(({ access_token }) => {

      cookie.save('sessionAuthenticated', access_token, { path: '/' });

      const afterLogin = this.props.location.state ? this.props.location.state.nextPathname : '/';
      this.props.router.push(afterLogin);

    }).catch((error) => {
      console.error(error);
      this.setState({ error });
    });
  }

  handleEmailChange(event) {
    const email = event.target.value;
    this.setState({ error: null, email });
  }

  handlePasswordChange(event) {
    const password = event.target.value;
    this.setState({ error: null, password });
  }

  render() {
    return (
      <LoginView
        {...this.state}
        handleEmailChange={this.handleEmailChange}
        handlePasswordChange={this.handlePasswordChange}
        onSubmit={this.onSubmit} />
    );
  }
}

export default withRouter(LoginRoute);
