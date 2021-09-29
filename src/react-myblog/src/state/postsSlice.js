import { createSlice } from "@reduxjs/toolkit"

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        list: [],
        selectedPostID: 0,
        errorMessage: '',
        loading: false,
    },
    reducers: {
        loadPostsSuccess: (state, action) => {
            state.list = action.payload || [];
            state.errorMessage = '';
            state.loading = false;
        },
        loadPostsFailure: (state, action) => {
            state.list = [];
            state.errorMessage = action.payload || 'Failed to load posts';
            state.loading = false;
        },
        setSelectedPostID: (state, action) => {
            state.selectedPostID = action.payload
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

//  Actions
export const { setSelectedPostID, setErrorMessage, loadPostsSuccess, loadPostsFailure, setLoading } = postsSlice.actions

//  Selectors
export const getPosts = state => state.posts.list
export const getErrorMessage = state => state.posts.errorMessage
export const getLoading = state => state.posts.loading
export const getSelectedPostID = state => state.posts.selectedPostID
export const getSelectedPost = id => state => state.posts.list.find(p => p.postId == id)

//  Reducers
export default postsSlice.reducer

//  Thunks (perform async logic)
export const loadPosts = () => async (dispatch, getState) => {
    //  Make sure the state has posts
    const state = getState()
    if (!state.posts.list?.length) {

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