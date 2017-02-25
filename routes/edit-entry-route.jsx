import { withRouter } from 'react-router';

import EntryView from '../components/entry-view.jsx';

import entryStore from '../stores/entry.js';

import makeRequestStore from '../stores/make-request.js';

class EditEntryRoute extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: null,
      title: '',
      text: ''
    };
  }

  componentDidMount() {
    this.getEntry();
  }

  getEntry() {
    const id = this.props.routeParams.id;

    if (!id) {
      return;
    }

    const { loading, title, text } = this.state;

    if (loading) {
      return;
    }

    entryStore.find(id).then(({ title, text }) => {
      this.setState({
        error: null,
        loading: false,
        title: title,
        text: text
      });
    }).catch((error) => {
      console.error(error);
      this.setState({ error, loading: false });
    });

    this.setState({ error: null, loading: true, title, text });
  }

  updateEntry({ text, title }) {
    if (!text && !title) {
      return;
    }

    const url = 'http://127.0.0.1:5000/entry/' + this.props.routeParams.id;

    return makeRequestStore.find(url, {
      method: 'PUT',
      body: JSON.stringify({ text, title })
    }).catch((error) => {
      console.error(error);
      this.setState({ error });
    });
  }

  render() {
    return (
      <EntryView {...this.state} save={this.updateEntry.bind(this)} />
    );
  }
};

export default withRouter(EditEntryRoute);
