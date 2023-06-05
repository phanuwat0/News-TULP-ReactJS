

export async function createPost(newPost) {
  if (!newPost) {
    throw new Error("Error in inserting new post " + newPost);
  }
  if (!newPost.id) {
    let id = genId();
    newPost = { ...newPost, id};
    console.log("new post", newPost);
  }
  // add new post to the express server
  try {
    let response = await fetch('/api/new', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
     
    }).then((res) => {
      if (!res.ok) {
        throw Error({ error: `Could not add new post ${newPost.name}` });
      }
      return res.json();
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

export const genId = () => Math.random().toString(36).substring(2, 9);
