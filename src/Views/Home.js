import React from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "./Post";

export function Home({ posts, users, selectedUsername }) {
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    console.log("Clicked post ID:", postId);
    navigate(`/Post/${postId}`);
  };

  return (
    <div className="homeContainer">
      {posts.map((eachPost, index) => {
        const user = users.find((user) => user.id === eachPost.userId);

        return (
          <div
            className="onePostHome"
            key={index}
            onClick={() => handlePostClick(eachPost.id, eachPost.userId)}
          >
            <h3>{eachPost.title}</h3>
            <p className="userName">
              <p className="userName">
                {user === undefined ? null : user.username}
              </p>
            </p>
            <p>{eachPost.body.slice(0, 60)}...</p>
            <label>#{eachPost.tags.join(" #")}</label>
          </div>
        );
      })}
    </div>
  );
}
