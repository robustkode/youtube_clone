import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import channelSlice from "./slices/channelSlice";
import videoSlice from "./slices/videoSlice";

export const store = configureStore(
  {
    reducer: {
      auth: authSlice,
      video: videoSlice,
      channel: channelSlice,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
