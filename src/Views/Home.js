import React from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "./Post";

export function Home({ posts, users, selectedUsername }) {
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    console.log("Clicked post ID:", postId);
    navigate(`/Post/${postId}`);
  };

  const usersMap = users.reduce((map, eachUser) => {
    map[eachUser.id] = eachUser;
    return map;
  }, {});

  return (
    <div className="homeContainer">
      {posts.map((eachPost, index) => {
        const isCreatedPost = users.find(
          (user) => user.username === eachPost.userId
        );

        return (
          <div
            className="onePostHome"
            key={index}
            onClick={() => handlePostClick(eachPost.id, eachPost.userId)}
          >
            <h3>{eachPost.title}</h3>
            <p className="userName">
              {isCreatedPost
                ? eachPost.userId
                : usersMap[eachPost.id] && (
                    <p className="userName">
                      {usersMap[eachPost.id].username}{" "}
                    </p>
                  )}
            </p>
            <p>{eachPost.body.slice(0, 60)}...</p>
            <label>{eachPost.tags.join(" ")}</label>
          </div>
        );
      })}
    </div>
  );
}
