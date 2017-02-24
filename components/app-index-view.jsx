import { Link } from 'react-router';

import SearchBar from '../components/search-bar.jsx';

import '../styles/app-index-view.less';

class AppIndexView extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      title: ''
    };
  }

  search() {
    const { title } = this.state;
    return this.props.search(title);
  }

  updateSearchTitle(event) {
    const title = event.target.value;
    this.setState({ title });
    return this.props.search(title);
  }

  render() {
    const { entries, identity } = this.props;
    const { title } = this.state;

    const list = entries.map(({ id, title, text }) => {
      return (
        <div className='entry-item' key={id} >
          <Link to={`/entry/${id}`} className='entry-details'>
            <span className='title'>{ title }</span>
            <span className='text'>{ text }</span>
            <div className='edit-entry'>
              <i className="mdi mdi-lead-pencil"></i>
            </div>
          </Link>
        </div>
      )
    })

    return (
      <div className='index-view'>
        <div className='header'>
          <h4 className='greeting'>Hello {identity}</h4>
          <button className='submit-form' onClick={this.props.logout}>
            <i className='mdi mdi-power' />
          </button>
        </div>
        <div className='buttons-container'>
          <SearchBar
            onChange={this.updateSearchTitle.bind(this)}
            search={this.search.bind(this)}
            title={title} />

          <button className='create-new-entry'>
            <Link to='/new'>Add New</Link>
          </button>
        </div>
        <div className='entry-list-container'>
          { entries.length ? list : <div className='no-entries'>Do not have any entry matching this criteria</div> }
        </div>
      </div>
    );
  }
};

export default AppIndexView;
