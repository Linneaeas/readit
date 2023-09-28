import React from "react";
import { useNavigate } from "react-router-dom";

export function Home({ posts, users, selectedUsername }) {
  const navigate = useNavigate();

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
            onClick={() => navigate("/Post/" + eachPost.id)}
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
