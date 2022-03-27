import './App.css';
import data from "./ex_data";
import Song from "./components/song";

console.log(data);
function App() {
  return (
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
  );
}
//export
export default App;

