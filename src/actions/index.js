import * as ActionType from './types'

/*---------------------
 * Action Creators
 *---------------------
 */

export function receivePosts(posts) {
  return {
    type: ActionType.RECEIVE_POSTS,
    posts,
  }
}

export function receivePost(post) {
  return {
    type: ActionType.RECEIVE_POST,
    post,
  }
}

export function postDeleted(post) {
  return {
    type: ActionType.DELETE_POST,
    post,
  }
}

export function receiveComments(comments) {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    comments,
  }
}

export function receiveComment(comment) {
  return {
    type: ActionType.RECEIVE_COMMENT,
    comment,
  }
}

export function commentDeleted(comment) {
  return {
    type: ActionType.DELETE_COMMENT,
    comment,
  }
}
