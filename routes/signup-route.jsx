import React from 'react';
import { withRouter } from 'react-router';

import SignupView from '../components/signup-view.jsx';

class SignupRoute extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      error: null,
      password: '',
      repassword:'',
      username: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepasswordChange = this.handleRepasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const { email, password, repassword, username } = this.state;

    if (password != repassword) {
      return this.setState({ error: 'password does not match' });
    }

    const data = { email, password, username };

    const url = 'http://127.0.0.1:5000/signup';

    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      this.props.router.push('/login');
    })
  }

  handleEmailChange(event) {
    const email = event.target.value;
    this.setState({ error: null, email });
  }

  handlePasswordChange(event) {
    const password = event.target.value;
    this.setState({ error: null, password });
  }

  handleRepasswordChange(event) {
    const repassword = event.target.value;
    this.setState({ error: null, repassword });
  }

  handleUsernameChange(event) {
    const username = event.target.value;
    this.setState({ error: null, username });
  }

  render() {
    return (
      <SignupView
        {...this.state}
        handleEmailChange={this.handleEmailChange}
        handlePasswordChange={this.handlePasswordChange}
        handleRepasswordChange={this.handleRepasswordChange}
        handleUsernameChange={this.handleUsernameChange}
        onSubmit={this.onSubmit} />
    );
  }
}

export default withRouter(SignupRoute);
