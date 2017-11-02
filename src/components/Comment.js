import React, { Component } from 'react'

class Comment extends Component {
  state = {
    body: '',
  }
  componentDidMount() {
    this.setState({
      body: this.props.comment.body,
    })
  }
  onBodyChanged = e => {
    const missingBody = e.target.value === ''

    this.setState({
      ...this.state,
      body: e.target.value,
      missingBody,
    })
  }
  onSubmit = () => {
    const { onUpdate } = this.props

    const payload = {
      body: this.state.body,
      timestamp: Date.now(),
    }

    onUpdate(payload)
  }
  render() {
    const { onUpvote, onDownvote, isEditModeOn, onEdit, onDelete } = this.props

    const { body, author, voteScore } = this.props.comment

    return (
      <article
        style={{
          backgroundColor: '#fff',
          color: '#697882',
          fontSize: '16px',
          padding: '10px 5px',
        }}
      >
        <header>
          <div style={{ lineHeight: 1.2 }}>
            <strong
              style={{
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              @{author}
            </strong>
            {!isEditModeOn && (
              <span
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                }}
              >
                <a style={{ color: '#697882' }} onClick={onDownvote}>
                  <i className="fa fa-arrow-down" />
                </a>
                &nbsp;
                <i
                  className="fa fa-heartbeat"
                  style={{
                    color:
                      voteScore === 0
                        ? 'gray'
                        : voteScore > 0 ? 'green' : 'red',
                  }}
                />
                {voteScore}
                &nbsp;
                <a style={{ color: '#697882' }} onClick={onUpvote}>
                  <i className="fa fa-arrow-up" />
                </a>
                &nbsp;
                <a style={{ color: '#697882' }} onClick={onEdit}>
                  <i className="fa fa-pencil" />
                </a>
                &nbsp;
                <a style={{ color: '#697882' }} onClick={onDelete}>
                  <i className="fa fa-close" />
                </a>
              </span>
            )}
          </div>
        </header>
        <div>
          {!isEditModeOn && body}
          {isEditModeOn && (
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  name="body"
                  value={this.state.body}
                  placeholder="Enter your comment..."
                  onChange={this.onBodyChanged}
                />
              </div>
              <div className="control">
                <a
                  className="button is-info"
                  onClick={this.onSubmit}
                  disabled={this.state.body === ''}
                >
                  Save
                </a>
              </div>
            </div>
          )}
        </div>
      </article>
    )
  }
}

export default Comment
