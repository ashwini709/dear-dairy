import { withRouter } from 'react-router';

import config from '../config/environment.js';

import SignupView from '../components/signup-view.jsx';

import makeRequestStore from '../stores/make-request.js';

const signupUrl = config.serverUrl + '/signup';

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

    return makeRequestStore.find(signupUrl, {
      method: 'POST',
      body: JSON.stringify({ email, password, username })
    }).then(() => {
      this.props.router.push('/login');
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
