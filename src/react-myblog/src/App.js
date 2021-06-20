import React from 'react'
import { Route, Switch } from 'react-router'
import Layout from './components/Layout'
import PostDisplay from './components/PostDisplay';
import PostList from './components/PostList'


export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={PostList} />
        <Route path="/posts/:postId" exact component={PostDisplay} />
      </Switch>
    </Layout>
  );
}
