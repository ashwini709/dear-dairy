import { withRouter } from 'react-router';

import config from '../config/environment.js';

import EntryView from '../components/entry-view.jsx';

import makeRequestStore from '../stores/make-request.js';

const newEntryUrl = config.serverUrl + '/entry';

class NewEntryRoute extends React.Component {

  createEntry({ text, title }) {
    if (!text && !title) {
      return;
    }

    return makeRequestStore.find(newEntryUrl, {
      method: 'POST',
      body: JSON.stringify({ text, title })
    }).then((id) => {
      const entryRoute = '/entry/' + id;

      this.props.router.push(entryRoute);
    }).catch((error) => {
      console.error(error);
      this.setState({ error });
    });
  }

  render() {
    return (
      <EntryView save={this.createEntry.bind(this)} />
    );
  }
};

export default withRouter(NewEntryRoute);
