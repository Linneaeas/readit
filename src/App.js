import React from "react";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Views/Home";
import { Post } from "./Views/Post";
import { CreatePost } from "./Views/CreatePost";

function App() {
  const [posts, setPosts] = useState([]); //Skapar State variables med empty arrays
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res.posts));

    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((res) => setUsers(res.users));

    fetch("https://dummyjson.com/comments")
      .then((res) => res.json())
      .then((res) => setComments(res.comments));
  }, []);

  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/CreatePost">Create Post</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<Home posts={posts} users={users} />} />
        <Route
          path="/CreatePost"
          element={<CreatePost posts={posts} users={users} />}
        />
        <Route
          path="/Post/:id"
          element={
            <Post
              posts={posts}
              users={users}
              comments={comments}
              setPosts={setPosts}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
