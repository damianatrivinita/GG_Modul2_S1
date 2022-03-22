import './App.css';
import data from './ex_data';

function App() {
  return (
    <div className="App">
      <div>
        <img className="album-img" src={data.album.images[0].url} width="180" height="180" />
      </div>
      <div>
        <h2>{data.name}</h2>
        <h3>{data.album.name}</h3>
        <p>{data.artists[0].name}</p>
	<button className="btn"><a href={data.album.artists[0].external_urls.spotify}>Select</a></button>
      </div>
    </div>
  );
}

export default App;