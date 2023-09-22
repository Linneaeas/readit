import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "./Post";

export function CreatePost({ users }) {
  const usernames = users.map((user) => user.username);

  return (
    <div>
      <h3>Usernames:</h3>
      <input list="usernames" placeholder="Select a username" />
      <datalist id="usernames">
        {usernames.map((username, index) => (
          <option key={index} value={username} />
        ))}
      </datalist>
    </div>
  );
}
