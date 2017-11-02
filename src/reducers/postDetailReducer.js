import {
  RECEIVE_POST,
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  DELETE_COMMENT,
} from '../actions'

const initialPostState = {
  post: {
    comments: [],
  },
}

function post(state = initialPostState, action) {
  switch (action.type) {
    case RECEIVE_POST:
      return {
        post: { ...action.post, comments: state.post.comments },
      }
    case RECEIVE_COMMENTS:
      return {
        post: { ...state.post, comments: action.comments },
      }
    case RECEIVE_COMMENT:
      let isExistingComment = false

      const newState = {
        post: {
          ...state.post,
          comments: state.post.comments.map(comment => {
            if (!isExistingComment && comment.id === action.comment.id) {
              isExistingComment = !isExistingComment

              return action.comment
            }

            return comment
          }),
        },
      }

      if (!isExistingComment) {
        ++newState.post.commentCount
        newState.post.comments.push(action.comment)
      }

      return newState
    case DELETE_COMMENT:
      const post = state.post
      --post.commentCount

      return {
        post: {
          ...post,
          comments: state.post.comments.filter(
            comment => comment.id !== action.comment.id,
          ),
        },
      }
    default:
      return state
  }
}

export default post
