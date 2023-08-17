import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        darkMode: false
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    }
});

//  Actions
export const {
    toggleDarkMode
} = themeSlice.actions

//  Selectors
export const getDarkModeFlag = state => state.theme.darkMode

//  Reducers
export default themeSlice.reducer

