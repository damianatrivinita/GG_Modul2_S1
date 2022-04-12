const Song = ({ uri, image, title, album, selectState, isSelected}) => {
  return (
    <div className="App">           
        <img className="album-img" src={image} alt="Album" height="180" width="180" />
        <h2>{title}</h2>
        <h3>{album}</h3>
        {/* <p>{artists}</p> */}
        <button
          className="btn"
          onClick={() => {
            selectState(uri);
          }}
        >
          {isSelected ? "DESELECT" : "SELECT"}
      </button>
    </div>      
    
  );
};

//export
export default Song;