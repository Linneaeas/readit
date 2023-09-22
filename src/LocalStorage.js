// POSTS
export const savePostsToLocalStorage = (posts) => {
  try {
    const serializedPosts = JSON.stringify(posts);
    localStorage.setItem("posts", serializedPosts);
  } catch (error) {
    console.error("Error saving Posts to local storage:", error);
  }
};
export const getPostsFromLocalStorage = () => {
  try {
    const serializedPosts = localStorage.getItem("posts");
    if (serializedPosts === null) {
      return undefined;
    }
    return JSON.parse(serializedPosts);
  } catch (error) {
    console.error("Error getting Posts from local storage:", error);
    return undefined;
  }
};
