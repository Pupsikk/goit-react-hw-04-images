import { useState } from 'react';
import PropTypes from 'prop-types';
import { CgSearch } from 'react-icons/cg';
import s from './Searchbar.module.css';

export const Searchbar = ({ search }) => {
  const [searchWord, setSearchWord] = useState('');

  const handleChangeWord = e => {
    setSearchWord(e.target.value);
  };

  const submitWord = e => {
    e.preventDefault();
    search(searchWord);
    setSearchWord('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={submitWord}>
        <button type="submit" className={s.button}>
          <CgSearch size="25" />
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeWord}
          value={searchWord}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  search: PropTypes.func.isRequired,
};
