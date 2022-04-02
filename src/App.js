import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Song from "./components/Song";
import url from "./spotify/dataspotify";

function App() {
  const [token, setToken] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [data, setdata] = useState([]);

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    setToken(accessToken);
  }, []);

  const getSong = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/search?q=${searchSong}&type=track&access_token=${token}`
      )
      .then((response) => {
        setdata(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="app">
      <h1 class="title">Create Playlist</h1>      
      <form action="#" id="form">
        <label for="title">Title</label>
        <br />
        <input placeholder="Add title" type="text" name="title" id="title" />
        <br /><br />
        <label for="description">Description</label>
        <br />
        <textarea
          placeholder="Add description"
          name="description"
          id="description"
        ></textarea>
        <br /><br />              
        <input class="btn" type="submit" value="Create Playlist" />
     </form>
    <div className="App">
      <div className="PlaylistMenu">
        <h2 className="Playlistname">
           Playlist
        </h2>
        <a
          href={url}
          className="btn-login"
        >
          Login
        </a>
      </div>
      <div class="Search">
        <div class="SearchMenu">
          <div class="SearchDetail">
            <input
              type="search"
              class="SearchInti"
              placeholder="Type Something"
              aria-label="Search"
              onChange={(e) => setSearchSong(e.target.value)}
            />
            <button class="btn" type="button" onClick={getSong}>Search</button>
          </div>
        </div>
      </div>      
      <div className="App">      
        {data.map((song) => {
          const { id, name, artists, album } = song;
          return (
            <Song
              key={id}
              title={name}
              image={album.images[0]?.url}
              album={album.name}
              artists={artists[0]?.name}
              url={album.artists[0]?.external_urls.spotify}
            />
          );
        })}
      </div>
    </div>
    </div>
  );
}

//export
export default App;

