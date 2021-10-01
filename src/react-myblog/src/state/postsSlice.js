import { createSlice } from '@reduxjs/toolkit'
import { getPostsUrl } from '../apiConfig'
import Status from '../enums/postsEffectStatus'

//  Slice configuration
export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        list: [],
        selectedPostID: 0,
        errorMessage: '',
        loading: false,
        status: Status.INITIAL
    },
    reducers: {
        loadPostsSuccess: (state, action) => {
            state.list = action.payload || []
            state.errorMessage = ''
            state.loading = false
            state.status = Status.LOADED
        },
        loadPostsFailure: (state, action) => {
            state.list = []
            state.errorMessage = action.payload || 'Failed to load posts'
            state.loading = false
            state.status = Status.FAILED
        },
        savePostSuccess: (state, action) => {
            const newPost = action.payload
            const prevPostIndex = state.list.findIndex(p => p.postId === newPost.postId)
            if (prevPostIndex >= 0) {
                state.list.splice(prevPostIndex, 1, newPost)
            } else {
                state.list.push(newPost)
            }
            state.errorMessage = ''
            state.loading = false
            state.status = Status.SAVED
        },
        savePostFailure: (state, action) => {
            state.errorMessage = action.payload || 'Failed to load posts'
            state.loading = false
            state.status = Status.FAILED
        },
        updatePost: (state, action) => {
            const newPost = action.payload
            const prevPostIndex = state.list.findIndex(p => p.postId === newPost.postId)
            if (prevPostIndex >= 0) {
                state.list.splice(prevPostIndex, 1, newPost)
            }
        },
        setSelectedPostID: (state, action) => {
            state.selectedPostID = action.payload
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        }
    }
})

//  Actions
export const {
    setSelectedPostID,
    setErrorMessage,
    loadPostsSuccess,
    loadPostsFailure,
    setLoading,
    savePostSuccess,
    savePostFailure,
    updatePost,
    setStatus,
} = postsSlice.actions

//  Selectors
export const getPosts = state => state.posts.list
export const getErrorMessage = state => state.posts.errorMessage
export const getLoading = state => state.posts.loading
export const getStatus = state => state.posts.status
export const getSelectedPostID = state => state.posts.selectedPostID
export const getSelectedPost = id => state => state.posts.list.find(p => p.postId == id)

//  Reducers
export default postsSlice.reducer

//  Thunks (perform async logic, aka side effecs)
export const loadPostsAsync = () => async (dispatch, getState) => {
    const state = getState()
    if (!state.posts.list?.length && state.posts.status !== Status.LOADED) {

        dispatch(setLoading(true))

        try {
            const response = await fetch('/api/posts')
            const json = await response.json()
            dispatch(loadPostsSuccess(json))
        }
        catch {
            dispatch(loadPostsFailure('There was an error while trying to get the posts. Please, try again.'))
        }
    }
}

export const savePostAsync = (fetchAction, post) => async dispatch => {

    dispatch(setLoading(true))
    dispatch(setStatus(Status.SUBMITTING))

    try {
        const url = getPostsUrl()
        const savedPost = await fetchAction('PUT', url, post)
        dispatch(savePostSuccess(savedPost))
    } catch (error) {
        let message = 'There was an error while trying to update the posts. Please, try again.'

        if (typeof error === 'string') {
            message = error
        }

        dispatch(savePostFailure(message))
    }
}
