import React from "react";
import { useParams } from "react-router-dom";

export function Post({ posts, users, comments }) {
  let { id } = useParams();

  const indPost = posts.find((indPost) => indPost.id === parseInt(id, 10));

  const indUser = users.find(
    (indUser) => indUser.id === (indPost && indPost.id)
  );

  const indComment = comments.find(
    (indComment) => indComment.id === (indComment && indPost.id)
  );
  console.log(indComment);

  return (
    <div className="postContainer">
      {indPost && indUser && indComment ? (
        <>
          <div className="postSection">
            <h5 className="userName"> {indUser.username} </h5>
            <h3>{indPost.title}</h3>
            <p>{indPost.body}</p>
          </div>
          <div className="postReactionsComments">
            <p>{indPost.tags}</p>
            <p>{indPost.reactions}</p>
          </div>
          <div className="commentSection">
            <h4>Comments:</h4>
            <h5>{indComment.user.username}</h5>
            <p>{indComment.body}</p>
          </div>
        </>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
}
