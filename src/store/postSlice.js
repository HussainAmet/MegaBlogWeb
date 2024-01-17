import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPosts: [],
}

const postSlice = createSlice ({
    name: "posts",
    initialState,
    reducers: {
        getAllPosts: (state, action) => {
            state.allPosts = action.payload.posts;
        },
    }
})

export const { getAllPosts } = postSlice.actions;

export default postSlice.reducer;