import { configureStore } from '@reduxjs/toolkit'
import postReducer from './state/postsSlice'

export default configureStore({
    reducer: {
        posts: postReducer
    },
})