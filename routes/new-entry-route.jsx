import { withRouter } from 'react-router';

import EntryView from '../components/entry-view.jsx';

import entryStore from '../stores/entry.js';

class NewEntryRoute extends React.Component {

  createEntry(data) {
    return fetch('http://127.0.0.1:5000/entry', {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {

    })
  }

  render() {
    return (
      <EntryView save={this.createEntry.bind(this)} />
    );
  }
};

export default withRouter(NewEntryRoute);
