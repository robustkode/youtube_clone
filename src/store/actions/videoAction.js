import request from "../../api";
import { setError, setVideos, addVideos } from "../slices/videoSlice";

export const getPopularVideos = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "US",
          maxResults: 20,
          pageToken: getState().video.nextPageToken,
        },
      });

      dispatch(
        addVideos({
          videos: data.items,
          nextPageToken: data.nextPageToken,
          catagory: "All",
        })
      );
    } catch (error) {
      console.log(error, "erero");
      dispatch(setError({ error }));
    }
  };
};
export const getVideosByCategory = (keyword) => {
  return async (dispatch, getState) => {
    const catagory = getState().video.catagory;
    console.log(keyword, catagory);
    try {
      const { data } = await request("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          pageToken: getState().video.nextPageToken,
          q: keyword,
          type: "video",
        },
      });
      if (catagory === keyword) {
        dispatch(
          addVideos({
            videos: data.items,
            nextPageToken: data.nextPageToken,
            catagory: keyword,
          })
        );
      } else {
        dispatch(
          setVideos({
            videos: data.items,
            nextPageToken: data.nextPageToken,
            catagory: keyword,
          })
        );
      }
    } catch (error) {
      dispatch(setError({ error: error }));
    }
  };
};

export const getRelatedVideos = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await request("/search", {
        params: {
          part: "snippet",
          relatedToVideoId: id,
          maxResults: 15,
          type: "video",
        },
      });
      dispatch(
        addVideos({
          videos: data.items,
          nextPageToken: data.nextPageToken,
          catagory: "All",
        })
      );
    } catch (error) {
      dispatch(setError({ error: error }));
    }
  };
};

export const getVideosBySearch =
  (keyword, nextPageToken = undefined) =>
  async (dispatch) => {
    try {
      const { data } = await request("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          q: keyword,
          type: "video,channel",
          pageToken: nextPageToken,
        },
      });

      dispatch(
        setVideos({
          videos: data.items,
          nextPageToken: data.nextPageToken,
          catagory: null,
        })
      );
    } catch (error) {
      dispatch(setError({ error: error }));
    }
  };

export const getSubscribedChannels = () => {};
