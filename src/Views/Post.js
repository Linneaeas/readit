import React from "react";
import { useParams } from "react-router-dom";
import { Home } from "./Home";

export function Post({ posts }) {
  let { id } = useParams();

  const post = posts.find((post) => post.id === parseInt(id, 10));

  return (
    <div>
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>{post.tags}</p>
          <p>{post.reactions}</p>
        </>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
}
