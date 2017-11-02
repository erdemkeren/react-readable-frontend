import { RECEIVE_POSTS, RECEIVE_POST, DELETE_POST } from '../actions'

const initialPostListState = {
  posts: []
}

function posts (state = initialPostListState, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case RECEIVE_POST:
      return {
        posts: state.posts.map((post) => post.id === action.post.id ? action.post : post)
      }
    case DELETE_POST:
      return {
        posts: state.posts.filter((post) => post.id !== action.post.id)
      }
    default:
      return state
  }
}

export default posts
