import { useEffect, useState } from "react";
import "./css/comment.css";
import axios from "axios";

const CommentList = () => {
	const [posts, setPosts] = useState({}); // we are getting back an object from our api
	const fetchPosts = async () => {
		const res = await axios.get("http://localhost:3000/posts");

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
			</div>
		);
	});

	return <>{renderedPosts}</>;
};

export default CommentList;
