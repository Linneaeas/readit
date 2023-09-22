import React, { useState } from "react";
import { Post } from "./Post";
import {
  getPostsFromLocalStorage,
  savePostsToLocalStorage,
} from "../LocalStorage";
import { useEffect } from "react";

export function CreatePost({ users, setPosts, posts }) {
  const usernames = users.map((user) => user.username);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newPost, setNewPost] = useState([]); // Updated to an array to store multiple posts
  const [selectedUsername, setSelectedUsername] = useState("");

  useEffect(() => {
    // Retrieve posts from local storage when the component mounts
    const storedPosts = getPostsFromLocalStorage();
    if (storedPosts) {
      setNewPost(storedPosts);
    }
  }, []);

  const handleAddPost = () => {
    const selectedUser = users.find(
      (user) => user.username === selectedUsername
    );

    if (selectedUser) {
      fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          body: newBody,
          userId: selectedUser.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const newPostItem = {
            id: data.id,
            title: newTitle,
            body: newBody,
            user: selectedUsername,
          };

          setPosts([
            ...posts,
            {
              id: data.id,
              title: newTitle,
              body: newBody,
              userId: selectedUser.id,
              tags: [],
              reactions: 0,
            },
          ]);

          setNewPost([...newPost, newPostItem]);

          savePostsToLocalStorage([...newPost, newPostItem]); // Save updated posts to local storage
        })
        .catch((error) => console.error("Error adding post:", error));

      setNewTitle("");
      setNewBody("");
    }
  };

  const handleUsernameChange = (event) => {
    setSelectedUsername(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setNewBody(event.target.value);
  };

  return (
    <div>
      <h3>Usernames:</h3>
      <input
        list="usernames"
        placeholder="Select a username"
        value={selectedUsername}
        onChange={handleUsernameChange}
      />
      <datalist id="usernames">
        {usernames.map((username, index) => (
          <option key={index} value={username} />
        ))}
      </datalist>
      <input
        type="text"
        placeholder="Write the title of your post"
        value={newTitle}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Write your content"
        value={newBody}
        onChange={handleBodyChange}
      />
      <button onClick={handleAddPost}>Add Post</button>

      {/* Display the added posts */}
      <div>
        {newPost.map((post, index) => (
          <div key={index}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <p>User: {post.user}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
