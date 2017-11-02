import React, { Component } from 'react'
import {
  fetchPost,
  fetchCategories,
  createPost,
  updatePost,
} from '../utils/api'
import { Link } from 'react-router-dom'
import uuidv4 from 'uuid/v4'

class PostForm extends Component {
  state = {
    post: {
      title: '',
      category: 'react',
      author: '',
      body: '',
    },
    categories: [],
  }
  componentDidMount() {
    const id = this.props.match.params.post

    if (id) {
      fetchPost(id).then(post => {
        this.setState({
          ...this.state,
          post,
        })
      })
    }

    fetchCategories().then(categories => {
      this.setState({
        ...this.state,
        categories: categories.categories,
      })
    })
  }
  handleInputChange = e => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      post: {
        ...this.state.post,
        [name]: value,
      },
    })
  }
  submit = () => {
    const { post } = this.state

    const exists = post.id ? true : false

    const promise = exists ? this.update(post) : this.create(post)

    promise.then(post => {
      this.props.history.push(`/${post.category}/${post.id}`)
    })
  }
  create = post => {
    const payload = {
      ...post,
      id: uuidv4(),
      timestamp: Date.now(),
    }

    return createPost(payload)
  }
  update = post => {
    const payload = post

    return updatePost(payload)
  }
  render() {
    const { post, categories } = this.state

    const isDisabled =
      post.title === '' ||
      post.category === '' ||
      post.body === '' ||
      post.author === ''

    return (
      <div>
        <section className="hero is-dark">
          <div className="hero-body">
            <div className="container">
              <p className="title">
                {post.id ? 'Edit' : 'Create'}:{' '}
                {post.id ? post.title : 'New Post'}
              </p>
            </div>
          </div>
        </section>

        <div className="container">
          <nav className="breadcrumb">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {post.id && (
                <li>
                  <Link to={`/${post.category}`}>{post.category}</Link>
                </li>
              )}
              {post.id ? (
                <li className="is-active">
                  <a>Edit "{post.title}"</a>
                </li>
              ) : (
                <li className="is-active">
                  <a>Create Post</a>
                </li>
              )}
            </ul>
          </nav>

          <form>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter the title of the post..."
                  value={post.title}
                  name="title"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder="Your user name..."
                  value={post.author}
                  name="author"
                  onChange={this.handleInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fa fa-user" />
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select
                    name="category"
                    onChange={this.handleInputChange}
                    value={post.category}
                  >
                    {categories.map(category => (
                      <option key={category.path} name={category.path}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Body</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Textarea"
                  name="body"
                  value={post.body}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button
                  type="button"
                  onClick={this.submit}
                  className="button is-link"
                  disabled={isDisabled}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default PostForm
