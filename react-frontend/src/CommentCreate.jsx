import React from "react";
import "./css/comment.css";
import axios from "axios";
import { useState } from "react";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const post = async (event) => {
    event.preventDefault();

    const data = await axios.post(
      `http://posts.com/posts/${postId}/comments`, //8000
      {
        content,
      }
    );

    setContent("");
  };
  return (
    <>
      <div className="form-groupC">
        <form onSubmit={post}>
          <div>
            <label>New Comment</label>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="inputC"
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

export default CommentCreate;
