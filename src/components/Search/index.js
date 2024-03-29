import './../../App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/tokenSlice';
import Song from "../Song";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Search() {
  const [searchSong, setSearchSong] = useState("");
  const [data, setdata] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [combineSongs, setCombineSongs] = useState([]);  
  const dispatch = useDispatch();
  const [accToken, setAccToken] = useState('');

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    setAccToken(accessToken);
    if (accessToken !== null) {
      setAccToken(accessToken);

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
    console.log(handleCombineTracks);
  }, [data, selectedSongs]);

  const getSong = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/search?q=${searchSong}&type=track&access_token=${accToken}`
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
    <div class="App">      
      <div class="searching">
        {/* <input type="search" class="SearchValue" placeholder="Input Song" aria-label="Search" onChange={(e) => setSearchSong(e.target.value)} /> */}
            <TextField id="outlined-basic" label="Type artists,songs" variant="outlined" onChange={(e) => setSearchSong(e.target.value)}/>
            <Button variant="contained" onClick={getSong}>Search</Button>
        {/* <button class="btn-2" type="button" onClick={getSong}> Search </button> */}
      </div>              
      <div className="App"> 
        <div className='album-card'>  
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


export default Search;