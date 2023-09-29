import React, { useState } from "react";
import { useParams } from "react-router-dom";

export function Post({ posts, users, comments, setComments, setPosts }) {
  const [newBody, setNewBody] = useState("");
  const [newComment, setNewComment] = useState([]);
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
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomCommentUser = users[randomUserIndex];

    fetch("https://dummyjson.com/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: newBody,
        postId: indPost.id,
        user: randomCommentUser,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
    setNewBody("");
  };

  return (
    <div className="bigPostContainer">
      <div className="postContainer">
        {indPost && indUser ? (
          <>
            <div className="postSection">
              <p className="userName"> {indUser.username} </p>
              <h3>{indPost.title}</h3>
              <p>{indPost.body}</p>
            </div>
            <div className="postReactionsComments">
              <label className="tags">#{indPost.tags.join(" #")}</label>
              <div className="likes">
                {" "}
                <p className="nrLikes">{indPost.reactions}</p>
                <button
                  className="likeButton"
                  onClick={handleLikeClick}
                ></button>
              </div>
            </div>
            <div className="commentSection">
              <h4 className="commentsHeadline">COMMENTS:</h4>

              {comments.map((commentData, index) => {
                if (commentData.postId === indPost.id) {
                  return (
                    <div className="oneComment" key={index}>
                      <p className="userName">{commentData.user.username}</p>
                      <p>{commentData.body}</p>
                    </div>
                  );
                }
                return null;
              })}
              {newComment.map((comment, index) => (
                <div className="oneComment" key={index}>
                  <p className="userName">{comment.user.username}</p>
                  <p>{comment.body}</p>
                </div>
              ))}
              <div className="newComment">
                <textarea
                  className="newCommentBox"
                  placeholder="Add a comment..."
                  value={newBody}
                  onChange={handleCommentChange}
                />
                <button className="commentButton" onClick={handleAddComment}>
                  COMMENT
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Post not found</p>
        )}
      </div>
    </div>
  );
}
