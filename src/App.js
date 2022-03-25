import './App.css';
import data from "./ex_data";
import Song from "./components/song";

function App() {
  return (
    <div className="App">
      <Song
        image={data.album.images[0].url}
        title={data.name}
        album={data.album.name}
        artists={data.artists[0].name}        
        url={data.album.artists[0].external_urls.spotify}
      />
    </div>
  );
}

export default App;

