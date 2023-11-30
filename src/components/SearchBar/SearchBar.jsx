import React, { useState } from 'react';
import Notiflix from 'notiflix';

 

const SearchBar = ({ formSubmitHandler }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      Notiflix.Notify.failure('Empty field');
      return;
    }
    formSubmitHandler(searchQuery);
  };

  return (
    <div className="search-bar">
      <form className="search-form form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search images..."
          aria-label="Search"
          autoComplete="off"
          onChange={handleChange}
          value={searchQuery}
          style={{ width: '1150px', height: '54px' }}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          style={{ width: '350px', height: '54px' }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
