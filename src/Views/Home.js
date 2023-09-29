import React from "react";
import { useNavigate } from "react-router-dom";

export function Home({ posts, users }) {
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
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
            <p className="userNameHome">
              {user === undefined ? null : user.username}
            </p>
            <p>{eachPost.body.slice(0, 60)}...</p>
            <label>#{eachPost.tags.join(" #")}</label>
          </div>
        );
      })}
    </div>
  );
}
