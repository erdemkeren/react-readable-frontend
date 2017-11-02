import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchPost,
  fetchCommentsByPostId,
  createComment,
  upvoteComment,
  downvoteComment,
  updateComment,
  deleteComment,
  upvotePost,
  downvotePost,
  deletePost
} from '../utils/api'
import {
  receivePost,
  receiveComments,
  receiveComment,
  postDeleted,
  commentDeleted
} from '../actions'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import CommentForm from './CommentForm'
import sortBy from 'sort-by'

class PostView extends Component
{
  state = {
    editCommentId: null
  }
  componentDidMount() {
    const { dispatch } = this.props
    const postId = this.props.match.params.post

    fetchPost(postId).then((post) => {
      dispatch(receivePost(post))
    }).catch((e) => {
      alert("The post doesn't exists any more.")

      const category = this.props.match.params.category

      this.props.history.push(`/${category}`)
    })

    fetchCommentsByPostId(postId).then((comments) => {
      dispatch(receiveComments(comments))
    })
  }
  upvoteComment = (comment) => {
    const { dispatch } = this.props

    upvoteComment(comment.id).then((comment) => {
      dispatch(receiveComment(comment))
    })
  }
  downvoteComment = (comment) => {
    const { dispatch } = this.props

    downvoteComment(comment.id).then((comment) => {
      dispatch(receiveComment(comment))
    })
  }
  upvotePost = () => {
    const { dispatch, post } = this.props

    upvotePost(post.id).then((post) => {
      dispatch(receivePost(post))
    })
  }
  downvotePost = () => {
    const { dispatch, post } = this.props

    downvotePost(post.id).then((post) => {
      dispatch(receivePost(post))
    })
  }
  deletePost = () => {
    const { dispatch, post } = this.props

    deletePost(post.id).then((post) => {
      dispatch(postDeleted(post))

      this.props.history.push(`/${post.category}`)
    })
  }
  createComment = (payload) => {
    const { dispatch , post } = this.props

    createComment(post.id, payload).then((comment) => {
      dispatch(receiveComment(comment))
    })
  }
  editComment = (comment) => {
    this.setState({
      ...this.state, editCommentId: comment.id
    })
  }
  updateComment = (id, payload) => {
    const { dispatch } = this.props

    updateComment(id, payload).then((comment) => {
      dispatch(receiveComment(comment))

      this.setState({
        ...this.state, editCommentId: null
      })
    })
  }
  deleteComment = (comment) => {
    const { dispatch } = this.props

    deleteComment(comment.id).then((comment) => {
      dispatch(commentDeleted(comment))
    })
  }
  render() {
    const { post } = this.props
    const date = (new Date(post.timestamp)).toLocaleDateString()
    const category = this.props.match.params.category

    post.comments.sort(sortBy('-voteScore'))

    return (
      <div>
        <section className="section">
          <div className="container">
          <div className="is-pulled-right" style={{
            fontSize: "20px",
            width: "150px"
          }}>
            <p className="is-pulled-left">
              <i className="fa fa-comment-o"></i>
              &nbsp;{post.commentCount}
            </p>
            <p className="is-pulled-right" style={{
              marginLeft: '10px'
            }}>
              <a style={{ color: '#697882' }} onClick={this.downvotePost}>
                <i className="fa fa-arrow-down"></i>
              </a>
              &nbsp;
              <i className="fa fa-heartbeat" style={{
                color: post.voteScore === 0
                  ? "gray"
                  : post.voteScore > 0
                    ? "green"
                    : "red",
              }}></i>
              &nbsp;{post.voteScore}
              &nbsp;
              <a style={{ color: '#697882' }} onClick={this.upvotePost}>
                <i className="fa fa-arrow-up"></i>
              </a>
            </p>
          </div>
            <h1 className="title">
              { post.title }
              <Link
                className="button is-text is-small"
                to={`/${post.category}/${post.id}/edit`}
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                type="button"
                className="button is-text is-small"
                onClick={this.deletePost}
              >
                <i className="fa fa-remove"></i>
              </button>
            </h1>
            <h2 className="subtitle" style={{
              color: "#4a4a4a",
              fontSize: "1.25rem",
              fontWeight: 400,
              lineHeight: 1.25,
            }}>by {post.author} on {date}</h2>
            <hr style={{ marginBottom: 0 }}/>
            <nav className="breadcrumb">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to={`/${post.category}`}>{category}</Link></li>
                <li className="is-active"><a>{post.title}</a></li>
              </ul>
            </nav>

            <div className="columns">
              <div className="column">
                {post.body}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h1 className="title">Comments ({post.commentCount})</h1>
            <hr/>

            <div className="columns">
              <div className="column">
                { ! post.commentCount ? 'No comments yet.' : post.comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onUpvote={() => this.upvoteComment(comment)}
                    onDownvote={() => this.downvoteComment(comment)}
                    isEditModeOn={ this.state.editCommentId === comment.id }
                    onEdit={(payload) => this.editComment(comment)}
                    onUpdate={(payload) => this.updateComment(comment.id, payload)}
                    onDelete={() => this.deleteComment(comment)}
                  />
                ))}
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <CommentForm onSubmit={(comment) => this.createComment(comment)}/>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { post } = state.postDetailReducer

  return { post }
}

export default connect(
  mapStateToProps
)(PostView)
