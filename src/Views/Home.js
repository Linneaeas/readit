import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getPostsFromLocalStorage,
  savePostsToLocalStorage,
} from "../LocalStorage";

export function Home({ posts, users }) {
  const navigate = useNavigate();

  const usersMap = users.reduce((map, eachUser) => {
    //Anv Reduce metoden.
    map[eachUser.id] = eachUser; //Tilldelar ett "index" till varje anvandare.
    return map;
  }, {});

  return (
    <div className="homeContainer">
      {posts.map((eachPost, index) => (
        <div
          className="onePostHome"
          key={index}
          onClick={() => navigate("/Post/" + eachPost.id)}
        >
          <h3>{eachPost.title}</h3>
          {usersMap[eachPost.id] && (
            <p className="userName">{usersMap[eachPost.id].username} </p>
          )}
          <p>{eachPost.body.slice(0, 60)}...</p>
          <label>{eachPost.tags.join(" ")}</label>
        </div>
      ))}
    </div>
  );
}
