const AUTHORIZATION_HEADER = 'erdemkeren'

// Get all the posts.
export function fetchPosts()
{
  const url = 'http://localhost:3001/posts';

  return fetch(url, { headers: { 'Authorization': AUTHORIZATION_HEADER }})
    .then((res) => res.json())
}

// Get all the categories available for the app.
export function fetchCategories()
{
  const url = 'http://localhost:3001/categories';

  return fetch(url, { headers: { 'Authorization': AUTHORIZATION_HEADER }})
    .then((res) => res.json())
}

// Get the posts of the given category.
export function fetchPostsByCategory(categoryId)
{
  const url = `http://localhost:3001/${categoryId}/posts`;

  return fetch(url, { headers: { 'Authorization': AUTHORIZATION_HEADER }})
    .then((res) => res.json())
}

// Store a new post.
export function createPost({ id, timestamp, title, body, author, category })
{
  const url = `http://localhost:3001/posts`;

  return fetch(url, {
    headers: {
      'Authorization': AUTHORIZATION_HEADER,
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      id, category, author, title, body, timestamp
    })
  }).then((res) => res.json())
}

// Get the details of the post by the given unique identifier.
export function fetchPost(id)
{
  const url = `http://localhost:3001/posts/${id}`;

  return fetch(url, { headers: { 'Authorization': AUTHORIZATION_HEADER }})
    .then((res) => {
      if(! res.ok) {
        throw Error(res.statusText)
      }

      return res
    })
    .then((res) => res.json())
}

// Upvote the given post.
export function upvotePost(id)
{
  const url = `http://localhost:3001/posts/${id}`;

  return fetch(url, {
    headers: {
      'Authorization': AUTHORIZATION_HEADER,
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      option: 'upVote'
    })
  }).then((res) => res.json())
}

// Downvote the given post.
export function downvotePost(id)
{
  const url = `http://localhost:3001/posts/${id}`;

  return fetch(url, {
    headers: {
      'Authorization': AUTHORIZATION_HEADER,
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      option: 'downVote'
    })
  }).then((res) => res.json())
}

// Update the given post by the unique identifier.
export function updatePost({id, title, body})
{
  const url = `http://localhost:3001/posts/${id}`;

  return fetch(url, {
    headers: {
      'Authorization': AUTHORIZATION_HEADER,
      'Content-type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      title, body
    })
  }).then((res) => res.json())
}

// Delete the given post by the unique identifier.
export function deletePost(id)
{
  const url = `http://localhost:3001/posts/${id}`;

  return fetch(url, {
    headers: {
      'Authorization': AUTHORIZATION_HEADER,
      'Content-type': 'application/json'
    },
    method: 'DELETE',
  }).then((res) => res.json())
}

// Get the comments of the given post by the unique identifier.
export function fetchCommentsByPostId(id)
{
  const url = `http://localhost:3001/posts/${id}/comments`;

  return fetch(url, { headers: { 'Authorization': AUTHORIZATION_HEADER }})
    .then((res) => res.json())
}

// Store a new comment.
export function createComment(postId, { id, author, body, timestamp })
{
    const url = `http://localhost:3001/comments`;

    return fetch(url, {
      headers: {
        'Authorization': AUTHORIZATION_HEADER,
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        parentId: postId, id, author, body, timestamp
      })
    }).then((res) => res.json())
}

// Upvote the given comment.
export function upvoteComment(id)
{
  const url = `http://localhost:3001/comments/${id}`;

  return fetch(url, {
    headers: {
      'Authorization': AUTHORIZATION_HEADER,
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      option: 'upVote'
    })
  }).then((res) => res.json())
}

// Downvote the given comment.
export function downvoteComment(id)
{
  const url = `http://localhost:3001/comments/${id}`;

  return fetch(url, {
    headers: {
      'Authorization': AUTHORIZATION_HEADER,
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      option: 'downVote'
    })
  }).then((res) => res.json())
}

// Update the comment by the given unique identifier.
export function updateComment(id, { timestamp, body })
{
  const url = `http://localhost:3001/comments/${id}`;

  return fetch(url, {
    headers: {
      'Authorization': AUTHORIZATION_HEADER,
      'Content-type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      body, timestamp
    })
  }).then((res) => res.json())
}

// Delete the comment given by the unique identifier.
export function deleteComment(id)
{
  const url = `http://localhost:3001/comments/${id}`;

  return fetch(url, {
    headers: {
      'Authorization': AUTHORIZATION_HEADER,
      'Content-type': 'application/json'
    },
    method: 'DELETE',
  }).then((res) => res.json())
}
