import React from "react";
import "./css/comment.css";
import axios from "axios";
import { useState } from "react";

const CommentCreate = () => {
	const [title, setTitle] = useState("");

	const post = async (event) => {
		event.preventDefault();

		const data = await axios.post("http://localhost:3000/posts", {
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
						<label>Title</label>
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

export default CommentCreate;
