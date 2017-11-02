import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PostList from './components/PostList'
import PostView from './components/PostView'
import PostForm from './components/PostForm'
import CategoryPostList from './components/CategoryPostList'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={PostList} />
        <Route exact strict path="/create-post/" component={PostForm} />
        <Route exact strict path="/:category" component={CategoryPostList} />
        <Route exact strict path="/:category/:post" component={PostView} />
        <Route exact strict path="/:category/:post/edit" component={PostForm} />
      </div>
    )
  }
}

export default App
