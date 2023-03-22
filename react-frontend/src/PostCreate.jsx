import React from "react";
import "./css/post.css";
import axios from "axios";
import { useState } from "react";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const post = async (event) => {
    event.preventDefault();

    const data = await axios.post("http://posts.com/posts/create", {
      //3000
      title,
    });
    console.log(data);

    setTitle("");
  };
  return (
    <>
      <div className="form-group">
        <form onSubmit={post}>
          <div>
            <label>Post Title: </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              type="text"
            />
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PostCreate;
