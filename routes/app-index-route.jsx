import AppIndexView from '../components/app-index-view.jsx';

import entrySearchStore from '../stores/entry-search.js';

class AppIndexRoute extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      entries: [],
      error: null,
      loading: false
    };

    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  search(title) {
    const { loading, entries } = this.state;

    if (loading) {
      return;
    }

    entrySearchStore.find(title).then((entries) => {
      window.setTimeout(() => {
        this.setState({
          entries,
          error: null,
          loading: false
        });
      }, 0);
    }).catch((error) => {
      console.error(error);
      this.setState({ error, loading: false });
    });

    this.setState({ entries, error: null, loading: true });
  }

  render() {
    return (
      <AppIndexView {...this.state} search={this.search.bind(this)} />
    );
  }
}

export default AppIndexRoute;
