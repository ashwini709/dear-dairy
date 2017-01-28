import { Link } from 'react-router';

import '../styles/entry-view.less';

class EntryView extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      title: '',
      text: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { title, text } = nextProps;

    if (!title || !text) {
      return;
    }

    this.setState({ title, text });
  }

  save() {
    return this.props.save(this.state);
  }

  updateTitle(event) {
    const title = event.target.value;
    this.setState({ title });
  }

  updateText(event) {
    const text = event.target.value;
    this.setState({ text });
  }

  render() {
    const { title, text } = this.state;

    return (
      <div className='new-entry-container'>
        <input
          className='title'
          placeholder='Title'
          onChange={this.updateTitle.bind(this)}
          value={title} />

        <textarea
          className='text'
          placeholder='Text'
          onChange={this.updateText.bind(this)}
          value={text} />

        <button className='submit-form' onClick={this.save.bind(this)} >Add</button>
        <button className='go-back'><Link to='/'>Home</Link></button>
      </div>
    );
  }
};

export default EntryView;
