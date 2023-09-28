import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Post({ posts, users, comments, setPosts }) {
  const [newComment, setNewComment] = useState(""); //Skapar nya states for att kunna lagga till nya kommentarer.
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
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    // Generate a random user for this comment
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomCommentUser = users[randomUserIndex];

    fetch("https://dummyjson.com/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: newComment,
        postId: indPost.id, // Use the postId of the current post
        userId: randomCommentUser.id, // Use the randomly generated userId
      }),
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => console.error("Error adding comment:", error));

    setNewComment(""); // Clear the comment input field after adding a comment
  };

  console.log(comments);
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

            <div className="newComment">
              <textarea
                placeholder="Add a comment..."
                value={newComment}
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
