import React, { useState } from "react";

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
  const [tags, setNewTags] = useState([]);
  const [newPost, setNewPost] = useState([]);
  const [nextPostId, setNextPostId] = useState(31);
  const handleAddPost = () => {
    if (selectedUsername) {
      let user = users.find(
        (eachUser) => eachUser.username === selectedUsername
      );

      fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          body: newBody,
          userId: user.id,
          tags: tags.join(","),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPosts([
            ...posts,
            {
              id: nextPostId,
              title: newTitle,
              body: newBody,
              userId: user.id,
              tags: tags,
              reactions: 0,
            },
          ]);
          setNewPost([
            ...newPost,
            {
              id: nextPostId,
              godis: data,
              title: newTitle,
              userId: user.id,
              body: newBody,
              user: selectedUsername,
              tags: tags,
            },
          ]);
          setNextPostId(nextPostId + 1);
        })
        .catch((error) => console.error("Error adding post:", error));

      setSelectedUsername("");
      setNewTitle("");
      setNewBody("");
      setNewTags("");
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

  const handleTagsChange = (event) => {
    const tagsArray = event.target.value.split(",").map((tag) => tag.trim());
    setNewTags(tagsArray);
  };

  return (
    <div className="bigCreatePostContainer">
      <div className="createPostContainer">
        <div className="createNewPost">
          <h4>CREATE NEW POST</h4>
          <input
            className="selectBox"
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
          <textarea
            className="bodyInput"
            type="text"
            placeholder="Write your content"
            value={newBody}
            onChange={handleBodyChange}
          />
          <input
            type="text"
            placeholder="Write your tags"
            value={tags}
            onChange={handleTagsChange}
          />
          <button className="addButton" onClick={handleAddPost}>
            PUBLISH
          </button>
        </div>

        <div className="homeContainer">
          {newPost.map((godis, index) => (
            <div className="onePostHome" key={index}>
              <h3>{godis.title}</h3>
              <p className="userName">{godis.user}</p>
              <p>{godis.body}</p>
              <label>#{godis.tags.join(" #")}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
