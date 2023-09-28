import React, { useState } from "react";
import { Post } from "./Post";

export function CreatePost({
  users,
  setPosts,
  posts,
  selectedUsername,
  setSelectedUsername,
}) {
  const usernames = users.map((user) => user.username);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newPost, setNewPost] = useState([]); // Updated to an array to store multiple posts
  const [nextPostId, setNextPostId] = useState(31); // Initialize with 31
  const handleAddPost = () => {
    // Find the user object based on the selected username
    const selectedUser = { username: selectedUsername };

    // Check if a user was found
    if (selectedUsername) {
      fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          body: newBody,
          userId: selectedUsername,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Update the newPost state with the new post

          setPosts([
            ...posts,
            {
              id: nextPostId,
              title: newTitle,
              body: newBody,
              userId: selectedUsername,
              tags: [],
              reactions: 0,
            },
          ]);
          setNewPost([
            ...newPost,
            {
              godis: data,
              user: selectedUsername,
              title: newTitle,
              body: newBody,
            },
          ]);
          // Increment the next post ID for the next post
          setNextPostId(nextPostId + 1);
        })
        .catch((error) => console.error("Error adding post:", error));

      setSelectedUsername(""); // Clear the title input field after adding a post
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
      <div className="homeContainer">
        {newPost.map((godis, index) => (
          <div className="onePostHome" key={index}>
            <h3>{godis.title}</h3>
            <p className="userName">User: {godis.user}</p>
            <p>{godis.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
