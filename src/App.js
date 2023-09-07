import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())

      .then((res) => setPosts(res.posts));
  }, []);

  return (
    <>
      {posts.map((post, index) => (
        <div class="EachPost" key={index}>
          <h3 className="PostTitle">{post.title}</h3>
          <p className="PostBody">{post.body.slice(0, 60)}...</p>
          <label className="PostTags">
            {post.tags.map((tag, tagIndex) => (
              <span key={tagIndex}>
                {tag}
                {tagIndex < post.tags.length - 1 && " "}
              </span>
            ))}
          </label>
        </div>
      ))}
    </>
  );
}

export default App;
