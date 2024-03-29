import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import PageLayout from './components/layout/PageLayout'
import PostDisplay from './components/PostDisplay'
import PostList from './components/PostList'
import EditPost from './components/EditPost'
import AddPost from './components/AddPost'
import DeletePost from './components/DeletePost'
import AdminSignIn from './components/admin/AdminSignIn'
import AdminPostList from './components/admin/AdminPostList'
import NotFound from './components/layout/NotFound'
import About from './components/About'
import { useSelector } from 'react-redux'
import { getDarkModeFlag } from './state/themeSlice'

export default function App() {

  const darkMode = useSelector(getDarkModeFlag);

  useEffect(() => {
    if (darkMode) {
      if (!document.body.classList.contains('dark-mode')) {
        document.body.classList.add('dark-mode')
      }
    } else if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode')
    }

  }, [darkMode])

  return (
    <PageLayout>
      <Switch>
        <Route path="/" exact component={PostList} />
        <Route path="/posts/new" exact component={AddPost} />
        <Route path="/posts/:postId" exact component={PostDisplay} />
        <Route path="/posts/:postId/edit" exact component={EditPost} />
        <Route path="/posts/:postId/delete" exact component={DeletePost} />
        <Route path="/about" exact component={About} />
        <Route path="/admin/sign-in" exact component={AdminSignIn} />
        <Route path="/admin/posts" exact component={AdminPostList} />
        <Redirect path="/admin" exact to="/admin/sign-in" />
        <Route path="*" component={NotFound} />
      </Switch>
    </PageLayout>
  );
}
