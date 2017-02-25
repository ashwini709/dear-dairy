import '../styles/search-bar.less';

const SearchBar = ({ onChange, search, title }) => {
  return (
    <div className='search-bar'>
      <input
        className='title'
        placeholder='Title'
        onChange={onChange}
        value={title} />

      <button className='submit-form' onClick={search}>
        <i className='mdi mdi-magnify' />
      </button>
    </div>
  );
}

export default SearchBar;
