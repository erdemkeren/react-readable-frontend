import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Post extends Component {
  render() {
    const { post, onUpvote, onDownvote, onDelete } = this.props

    return (
      <div className="card" style={{
        marginBottom: '25px'
      }}>
        <header className="card-header">
          <div className="card-header-title" style={{
            justifyContent: 'space-between'
          }}>
            <p>
              <i className="fa fa-sticky-note" style={{
                color: "#363636",
                fontSize: "22px"
              }} />&nbsp;
              <Link to={`/${post.category}/${post.id}`}>
                {post.title}
              </Link>&nbsp;
              (<small>
                by {post.author} on <Link to={`/${post.category}`}>{post.category}</Link>
              </small>)
            </p>
            <div style={{ fontSize: "14px" }}>
              <p className="is-pulled-left">
                <i className="fa fa-comment-o"></i>
                &nbsp;{post.commentCount}
              </p>
              <p className="is-pulled-right" style={{
                marginLeft: '10px'
              }}>
                <a style={{ color: '#697882' }} onClick={onDownvote}>
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
                {post.voteScore}
                &nbsp;
                <a style={{ color: '#697882' }} onClick={onUpvote}>
                  <i className="fa fa-arrow-up"></i>
                </a>
              </p>
            </div>
          </div>
        </header>
        <div className="card-content">
          <div className="content">
            {post.body}
          </div>
        </div>
        <footer className="card-footer">
          <Link className="card-footer-item" to={`/${post.category}/${post.id}/edit`}>
            Edit
          </Link>
          <a className="card-footer-item" onClick={onDelete}>
            Delete
          </a>
        </footer>
      </div>
    )
  }
}
