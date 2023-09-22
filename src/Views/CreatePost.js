import React, { useState } from "react";
import { Post } from "./Post";

export function CreatePost({ users }) {
  const usernames = users.map((user) => user.username);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newPost, setNewPost] = useState([]); // Updated to an array to store multiple posts
  const [selectedUsername, setSelectedUsername] = useState("");

  const handleAddPost = () => {
    // Find the user object based on the selected username
    const selectedUser = users.find(
      (user) => user.username === selectedUsername
    );

    // Check if a user was found
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
          // Update the newPost state with the new post
          setNewPost([
            ...newPost,
            {
              post: data,
              user: selectedUsername,
              title: newTitle,
              body: newBody,
            },
          ]);
        })
        .catch((error) => console.error("Error adding post:", error));

      setNewTitle(""); // Clear the title input field after adding a post
      setNewBody(""); // Clear the body input field after adding a post
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
