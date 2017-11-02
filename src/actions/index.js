/*---------------------
 * Action Definitions
 *---------------------
 */

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const DELETE_POST = 'DELETE_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

/*---------------------
 * Action Creators
 *---------------------
 */

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

export function receivePost(post) {
  return {
    type: RECEIVE_POST,
    post,
  }
}

export function postDeleted(post) {
  return {
    type: DELETE_POST,
    post,
  }
}

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

export function receiveComment(comment) {
  return {
    type: RECEIVE_COMMENT,
    comment,
  }
}

export function commentDeleted(comment) {
  return {
    type: DELETE_COMMENT,
    comment,
  }
}
