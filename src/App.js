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
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route
          path="/Post/:id"
          element={<Post posts={posts} users={users} comments={comments} />}
        />
      </Routes>
    </>
  );
}

export default App;

/*In the routing configuration you provided, the App component is defining the routing for your application using React Router. Let's break down how the routes are working:

<Route path="/" element={<Home posts={posts} users={users} />} />:

When the URL matches the root path '/', it renders the Home component and passes the posts and users data as props to Home.
<Route path="/CreatePost" element={<CreatePost />} />:

When the URL matches '/CreatePost', it renders the CreatePost component.
<Route path="/Post/:id" element={<Post posts={posts} users={users} />} />:

When the URL matches '/Post/:id', where :id is a route parameter, it renders the Post component and passes the posts and users data as props to Post.
In the case of the Post component, it receives posts and users as props just like the Home component. The difference is in how these props are used within each component:

In the Home component, posts and users are used to display a list of posts, and they are accessed directly as local variables within the component.

In the Post component, posts and users are used to find and display information about a specific post and its associated user. The post and user variables are created by finding the appropriate data within the posts and users arrays based on the id parameter from the URL.

So, both components receive posts and users as props, but they use them differently based on the component's specific functionality. The Post component has additional logic to locate and display a single post and its associated user, while the Home component displays a list of posts.

The routing configuration you provided is correctly passing the data to both components, and they are working differently because they serve different purposes within your application. */
