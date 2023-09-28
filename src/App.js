import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Views/Home";
import { Post } from "./Views/Post";
import { CreatePost } from "./Views/CreatePost";

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");

  useEffect(() => {
    // Fetch data when component mounts
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res.posts));

    fetch("https://dummyjson.com/users?limit=100")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.users);
      });

    fetch("https://dummyjson.com/comments?limit=340")
      .then((res) => res.json())
      .then((res) => setComments(res.comments));
  }, []);

  return (
    <div className="pageContainer">
      <ul className="navLinks">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/CreatePost">Create Post</Link>
        </li>
      </ul>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              selectedUsername={selectedUsername}
              posts={posts}
              users={users}
            />
          }
        />
        <Route
          path="/CreatePost"
          element={
            <CreatePost
              selectedUsername={selectedUsername}
              setPosts={setPosts}
              posts={posts}
              users={users}
              setSelectedUsername={setSelectedUsername}
            />
          }
        />
        <Route
          path="/Post/:id"
          element={
            <Post
              posts={posts}
              users={users}
              comments={comments}
              setPosts={setPosts}
              selectedUsername={selectedUsername}
              setSelectedUsername={setSelectedUsername}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
