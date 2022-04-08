const Search = ({ setSearchSong, getSong }) => {
    return (
        <div class="Searching">
        <div class="SearchDetail">
          <div class="SearchMenu">
            <input
              type="search"
              class="SearchValue"
              placeholder="Input Song"
              aria-label="Search"
              onChange={(e) => setSearchSong(e.target.value)}
            />
            <button class="btn" type="button" onClick={getSong}>
              Search
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Search;
