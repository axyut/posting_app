import { useEffect, useState } from "react";
import "./css/comment.css";
import axios from "axios";

const CommentList = ({ postId }) => {
	const [comments, setComments] = useState([]); // we are getting an array of comments
	const fetchComments = async () => {
		const res = await axios.get(
			`http://localhost:8000/posts/${postId}/comments`
		);

		setComments(res.data);
	};

	// useEffect is use to ru code at very specific point in time of a lifecyle of a component
	// we only want to run fetchPost only 1 time when we've recieved a data back
	useEffect(() => {
		fetchComments();
	}, []);

	const renderedComments = comments.map((comment) => {
		return (
			<li key={comment.id}>
				<p>{comment.content}</p>
			</li>
		);
	});

	return <ul>{renderedComments}</ul>;
};

export default CommentList;
