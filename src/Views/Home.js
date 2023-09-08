import React from "react";
import { useEffect, useState, Link, Route, Routes } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res.posts));

    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((res) => setUsers(res.users));
  }, []);

  const usersMap = users.reduce((map, user) => {
    map[user.id] = user;
    return map;
  }, {});

  return (
    <>
      {posts.map((post, index) => (
        <div key={index} onClick={() => navigate("/Post/" + post.id)}>
          <h3>{post.title}</h3>
          {usersMap[post.userId] && (
            <p className="userName">{usersMap[post.userId].username} </p>
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
