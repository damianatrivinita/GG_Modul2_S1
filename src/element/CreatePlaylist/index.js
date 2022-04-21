import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Song from "../../components/Song";
import { retrieveUserId } from "../../axios/axios.service";
import Form from "../../components/Form";
import '../../App.css';

const CreatePlaylist = () => {
  const token = useSelector((state) => state.token.value);
  const [userId, setUserId] = useState("");
  // const [searchSong] = useState("");
  const [songData] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [combineSongs, setCombineSongs] = useState([]);


  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    const handleCombineTracks = songData.map((song) => ({
      ...song,
      isSelected: selectedSongs.find((data) => data === song.uri),
    }));
    setCombineSongs(handleCombineTracks);
  }, [songData, selectedSongs]);
 
  const getUserId = () => {
    retrieveUserId()
      .then((response) => {
        setUserId(response.data.id);
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
    <div>
      <div className="create-playlist">
      <h1 class="title">Create Playlist</h1>
      </div>
      {/* <Search getSong={getSong} setSearchSong={setSearchSong} /> */}
      <Form token={token} userId={userId} songUris={selectedSongs} />
      
      <div className="App">
        {combineSongs.map((song) => {
          const { uri, name, artists, album, isSelected } = song;
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
    
  );
};

export default CreatePlaylist;