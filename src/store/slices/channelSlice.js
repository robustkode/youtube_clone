import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  nextPageToken: undefined,
  error: undefined,
};
const channelSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.videos = action.payload.channels;
      state.nextPageToken = action.payload.nextPageToken;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
    addChannels: (state, action) => {
      state.videos = [...state.channels, ...action.payload.channels];
      state.nextPageToken = action.payload.nextPageToken;
      state.error = null;
    },
  },
});

export const { setChannels, setError, addChannels } = channelSlice.actions;

export default channelSlice.reducer;
