import React from "react";
import { useParams } from "react-router-dom";
import { Home } from "./Home";

export function Post({ posts, users }) {
  let { id } = useParams();

  const post = posts.find((post) => post.id === parseInt(id, 10));

  const user = users.find((user) => user.id === (post && post.id));

  return (
    <div>
      {post && user ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>{post.tags}</p>
          <p>{post.reactions}</p>
          <p className="userName"> {user.username} </p>
        </>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
}
