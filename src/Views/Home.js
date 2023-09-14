import React from "react";
import { useEffect, useState, Link, Route, Routes } from "react";
import { useNavigate } from "react-router-dom";

export function Home({ posts, users }) {
  const navigate = useNavigate();

  const usersMap = users.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});

  return (
    <>
      {posts.map((post, index) => (
        <div key={index} onClick={() => navigate("/Post/" + post.id)}>
          <h3>{post.title}</h3>
          {usersMap[post.id] && (
            <p className="userName">{usersMap[post.id].username} </p>
          )}
          <p>{post.body.slice(0, 60)}...</p>
          <label>
            {post.tags.map((tag, tagIndex) => (
              <span key={tagIndex}>
                {tag}
                {tagIndex < post.tags.length - 1 && " "}
              </span>
            ))}
          </label>
        </div>
      ))}
    </>
  );
}
