import React from "react";
import PostCreate from "./postCreate";
import PostList from "./PostList";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
	return (
		<>
			<PostCreate />
			<PostList>
				<CommentCreate />
				<CommentList />
			</PostList>
		</>
	);
};
