import React from 'react'
import { Route, Switch } from 'react-router'
import Layout from './components/Layout'
import PostDisplay from './components/PostDisplay'
import PostList from './components/PostList'
import EditPost from './components/EditPost'
import AddPost from './components/AddPost'

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={PostList} />
        <Route path="/posts/new" exact component={AddPost} />
        <Route path="/posts/:postId" exact component={PostDisplay} />
        <Route path="/posts/:postId/edit" exact component={EditPost} />
      </Switch>
    </Layout>
  );
}
