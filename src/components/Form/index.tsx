import { useEffect, useState } from "react";
import { retrieveUserId, createPlaylist, pushSongs } from "../../axios/axios.service";
import Button from '@mui/material/Button';
import { songUrisInterface } from "../../extype/interfaces";
import { useSelector } from "react-redux";

const Form = ({ songUris }:songUrisInterface) => {
  const token = useSelector((state: any) => state.token.value);
  const [playlistId, setPlaylistId] = useState("");
  const [userId, setUserId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });


  // useEffect(() => {
  //   if (playlistId) {
  //     addSongs();
  //   }
  // }, [playlistId]);

  useEffect(() => {    
    const getUserId = () => {
      retrieveUserId(token)
        .then((response) => {
          setUserId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const addSongs =  () => {
      pushSongs(playlistId, songUris, token)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (playlistId) {
      addSongs();
    }
    getUserId();
  }, [playlistId, songUris, token]);

  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (form.title.length > 10) {
      createPlaylist(userId, form.title, form.description, token)
        .then((response) => {
          setPlaylistId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
      setForm({ title: "", description: "" });
      alert("Create Playlist Successfully");
    } else {
      alert("Type up to 10 keywords of the Title");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-create">
        <div >
          <div >
            <label htmlFor="title" className="form-title">
              Title
            </label>
            <input
              type="text"
              className="form-title"
              placeholder="type title"
              name="title"
              value={form.title}
              onChange={handleForm}
            />
          </div>
          <div className="description">
            <label htmlFor="title" className="form-desc">
              Description
            </label>
            <input
              type="text"
              className="form-desc"
              placeholder="type description"
              name="description"
              value={form.description}
              onChange={handleForm}
            />
          </div>
          <div className="form-btn">
            <Button variant="contained" type="submit">Create</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;