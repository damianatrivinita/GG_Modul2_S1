const Song = ({ image, title, album,artists}) => {
  return (
    <div className="App">      
        <img className="album-img" src={image} alt="Album" height="180" width="180" />
        <h2>{title}</h2>
        <h3>{album}</h3>
        <p>{artists}</p>
        <button/>            
    </div>
  );
};

//export
export default Song;

