import { useEffect, useState } from "react";
import { createPlaylist, pushSongs } from "../../axios/axios.service";
import Button from '@mui/material/Button';

const Form = ({ userId, songUris }) => {
  const [playlistId, setPlaylistId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });


  useEffect(() => {
    if (playlistId) {
      addSongs();
    }
  }, [playlistId]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title.length > 10) {
      await createPlaylist(userId, form.title, form.description)
        .then((response) => {
          setPlaylistId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
      setForm({ title: "", description: "" });
      alert("Successfully");
    } else {
      alert("Title must be more than 10 characters");
    }
  };

  const addSongs = async () => {
    pushSongs(playlistId, songUris)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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