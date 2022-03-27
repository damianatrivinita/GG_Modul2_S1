const song = ({ image, title, album,url,artists }) => {
  return (
    <div className="App">
      <div className="body">
        <img className="album-img" src={image} alt="Album" height="180" width="180" />
        <h2>{title}</h2>
        <h3>{album}</h3>
        <p>{artists}</p>
        <button className="btn"><a href={url}>Select</a></button>    
      </div>     
    </div>
  );
};
//export
export default song;