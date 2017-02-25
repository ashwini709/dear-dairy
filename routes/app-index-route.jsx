import cookie from 'react-cookie';
import decode from 'jwt-decode';
import { withRouter } from 'react-router';

import AppIndexView from '../components/app-index-view.jsx';

import entrySearchStore from '../stores/entry-search.js';

class AppIndexRoute extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      entries: [],
      error: null,
      identity: '',
      loading: false
    };

    this.search = this.search.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
    this.search();
  }

  getUserInfo() {
    const token = cookie.load('sessionAuthenticated');
    const { identity } = decode(token);
    this.setState({ identity });
  }

  logout() {
    cookie.remove('sessionAuthenticated');
    this.props.router.push('/login');
  }

  search(title) {
    const { loading, entries } = this.state;

    if (loading) {
      return;
    }

    entrySearchStore.find(title).then((entries) => {
      this.setState({
        entries,
        error: null,
        loading: false
      });
    }).catch((error) => {
      console.error(error);
      this.setState({ error, loading: false });
    });

    this.setState({ entries, error: null, loading: true });
  }

  render() {
    return (
      <AppIndexView
        {...this.state}
        search={this.search.bind(this)}
        logout={this.logout.bind(this)} />
    );
  }
}

export default withRouter(AppIndexRoute);
