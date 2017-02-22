import React from 'react';
import cookie from 'react-cookie';
import { withRouter } from 'react-router';

import LoginView from '../components/login-view.jsx';

import appState from '../states/app.js';

class LoginRoute extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: null,
      password: '',
      username: ''
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

    const { password, username } = this.state;

    const data = {email: username, password};

    const url = 'http://127.0.0.1:5000/login';

    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status < 400) {
        return response.json();
      }
    }).then(({ access_token }) => {
      appState.sessionAuthenticated.assign(access_token);
      cookie.save('sessionAuthenticated', access_token, { path: '/' });

      const afterLogin = this.props.location.state ? this.props.location.state.nextPathname : '/';

      this.props.router.push(afterLogin);
    })
  }

  handleEmailChange(event) {
    const username = event.target.value;
    this.setState({ error: null, username });
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
