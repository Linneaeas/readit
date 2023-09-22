// POSTS
export const savePostsToLocalStorage = (newPosts) => {
  try {
    const serializedNewPosts = JSON.stringify(newPosts);
    localStorage.setItem("newPosts", serializedNewPosts);
  } catch (error) {
    console.error("Error saving Posts to local storage:", error);
  }
};
export const getPostsFromLocalStorage = () => {
  try {
    const serializedNewPosts = localStorage.getItem("newPosts");
    if (serializedNewPosts === null) {
      return undefined;
    }
    return JSON.parse(serializedNewPosts);
  } catch (error) {
    console.error("Error getting Posts from local storage:", error);
    return undefined;
  }
};
