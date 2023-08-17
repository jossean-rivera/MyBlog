import { configureStore } from '@reduxjs/toolkit'
import postReducer from './state/postsSlice'
import themeReducer from './state/themeSlice'

export default configureStore({
    reducer: {
        posts: postReducer,
        theme: themeReducer,
    },
})