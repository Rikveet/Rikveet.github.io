import {createSlice} from "@reduxjs/toolkit";

interface ThemeState{
    type: 'light' | 'dark',
}

const initialState: ThemeState = {
    type: 'light'
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            return {
                type : state.type === 'light' ? 'dark' : 'light'
            }
        }
    }
});

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;
