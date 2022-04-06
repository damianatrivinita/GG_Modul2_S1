import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from './redux/tokenSlice';
import Song from "./components/Song";
import url from "./spotify/dataspotify";


function App() {
  //const [token, setToken] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [data, setdata] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [combineSongs, setCombineSongs] = useState([]);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [accToken, setAccToken] = useState('');

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    setAccToken(accessToken);
    if (accessToken !== null) {
      setAccToken(accessToken);
      setIsLogin(accessToken !== null);

      const setUserProfile = async () => {
        try {
          const requestOptions = {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
          };
          console.log(requestOptions);

          const response = await fetch(`https://api.spotify.com/v1/me`, requestOptions).then(data => data.json());
          console.log(response);
          setUser(response);
        } catch(err) {
          alert(err)
        }
      }
      dispatch(setToken(accessToken));
      setUserProfile();
    }
  }, [dispatch]);

  useEffect(() => {
    const handleCombineTracks = data.map((song) => ({
      ...song,
      isSelected: selectedSongs.find((data) => data === song.uri),
    }));
    setCombineSongs(handleCombineTracks);
    console.log(handleCombineTracks));
  }, [data, selectedSongs]);

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

  const handleSelect = (uri) => {
    const selected = selectedSongs.find((song) => song === uri);
    selected
      ? setSelectedSongs(selectedSongs.filter((song) => song !== uri))
      : setSelectedSongs([...selectedSongs, uri]);
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
              class="search"
              placeholder="Type Something"
              aria-label="Search"
              onChange={(e) => setSearchSong(e.target.value)}
            />
            <button class="btn" type="button" onClick={getSong}>Search</button>
          </div>
        </div>
      </div>      
      <div className="App">      
        {combineSongs.map((song) => {
          const { name, artists, album, uri, isSelected } = song;
          return (
            <Song
              key={uri}
              title={name}
              image={album.images[0]?.url}
              album={album.name}
              artists={artists[0]?.name}
              url={album.artists[0]?.external_urls.spotify}
              uri={uri}
              selectState={handleSelect}
              isSelected={isSelected}
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