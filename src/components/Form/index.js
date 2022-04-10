import { useEffect, useState } from "react";
import { createPlaylist, pushSongs } from "../../axios/axios.service";

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
      alert("Successfully created playlist");
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
      <div className="judul">
        <div className="judul">
          <div className="judul">
            <label htmlFor="title" className="judul">
              Title
            </label>
            <input
              type="text"
              className="judul3"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleForm}
            />
          </div>
          <div className="keterangan">
            <label htmlFor="title" className="keterangan">
              Description
            </label>
            <input
              type="text"
              className="keterangan3"
              placeholder="Description"
              name="description"
              value={form.des}
              onChange={handleForm}
            />
          </div>
          <div>
            <button
              id="submit"
              type="submit"
              className="btn-create"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;