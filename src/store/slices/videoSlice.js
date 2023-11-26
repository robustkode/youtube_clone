import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  nextPageToken: undefined,
  catagory: "All",
  error: null,
};
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload.videos;
      state.nextPageToken = action.payload.nextPageToken;
      state.catagory = action.payload.catagory;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
    addVideos: (state, action) => {
      state.videos = [...state.videos, ...action.payload.videos];
      state.nextPageToken = action.payload.nextPageToken;
      state.catagory = action.payload.catagory;
      state.error = null;
    },
  },
});

export const { setVideos, setError, addVideos } = videoSlice.actions;

export default videoSlice.reducer;
