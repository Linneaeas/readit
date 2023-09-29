import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Post({ posts, users, comments, setComments, setPosts }) {
  const [newBody, setNewBody] = useState("");
  const [newComment, setNewComment] = useState([]); // Updated to an array to store multiple comments
  const { id } = useParams();
  const indPost = posts.find((post) => post && post.id === parseInt(id, 10));
  const indUser = users.find(
    (indUser) => indPost && indUser.id === indPost.userId
  );

  const handleLikeClick = () => {
    setPosts(
      posts.map((allPostsOneByOne) => {
        if (allPostsOneByOne === indPost) {
          return { ...indPost, reactions: indPost.reactions + 1 };
        } else {
          return allPostsOneByOne;
        }
      })
    );
  };

  const handleCommentChange = (event) => {
    setNewBody(event.target.value);
  };

  const handleAddComment = () => {
    console.log(newComment);
    // Generate a random user for this comment
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomCommentUser = users[randomUserIndex];

    fetch("https://dummyjson.com/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: newBody,
        postId: indPost.id, // Use the postId of the current post
        user: randomCommentUser,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the newPost state with the new post

        setComments([
          ...comments,
          {
            id: data.id,
            body: newBody,
            user: randomCommentUser,
          },
        ]);
        setNewComment([
          ...newComment,
          {
            id: data.id,
            user: randomCommentUser,
            body: newBody,
          },
        ]);
      })
      .catch((error) => console.error("Error adding comment:", error));

    setNewBody(""); // Clear the title input field after adding a post
  };

  return (
    <div className="postContainer">
      {indPost && indUser ? (
        <>
          <div className="postSection">
            <h5 className="userName"> {indUser.username} </h5>
            <h3>{indPost.title}</h3>
            <p>{indPost.body}</p>
          </div>
          <div className="postReactionsComments">
            <label>{indPost.tags.join(" ")}</label>
            <p>{indPost.reactions}</p>
            <button onClick={handleLikeClick}>Like</button>
          </div>
          <div className="commentSection">
            <h4>Comments:</h4>

            {comments.map((commentData, index) => {
              if (commentData.postId === indPost.id) {
                return (
                  <div key={index}>
                    <h5>{commentData.user.username}</h5>
                    <p>{commentData.body}</p>
                    <p>{commentData.postId}</p>
                  </div>
                );
              }
              return null;
            })}
            {newComment.map((comment, index) => (
              <div key={index}>
                <h5>{comment.user.username}</h5>
                <p>{comment.body}</p>
                <p>{comment.postId}</p>
              </div>
            ))}
            <div className="newComment">
              <textarea
                placeholder="Add a comment..."
                value={newBody}
                onChange={handleCommentChange}
              />
              <button className="addComment" onClick={handleAddComment}>
                Add comment
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
}
