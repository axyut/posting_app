import { useEffect, useState } from "react";
import "./css/post.css";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({}); // we are getting back an object from our api
  const fetchPosts = async () => {
    const res = await axios.get("http://posts.com/posts"); //3001

    setPosts(res.data);
  };

  // useEffect is use to ru code at very specific point in time of a lifecyle of a component
  // we only want to run fetchPost only when we've recieved a data back, not before
  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="form-group"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    );
  });

  return <>{renderedPosts}</>;
};

export default PostList;
