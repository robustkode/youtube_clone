import { useDispatch } from "react-redux";
import request from ".";
import { setError } from "../store/slices/authSlice";

export const getPopularVideos = async (dispatch, nextPageToken = null) => {
  try {
    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "US",
        maxResults: 20,
        pageToken: nextPageToken,
      },
    });
    return { videos: data.items, nextPageToken: data.nextPageToken };
  } catch (error) {
    dispatch(setError(error));
  }
};

export const getRelatedVideos = async (nextPageToken = null) => {
  const countries = [
    "US",
    "FR",
    "CN",
    "JP",
    "DE",
    "GB",
    "RU",
    "BR",
    "IT",
    "IN",
  ];

  const randomCountry = countries[Math.floor(Math.random() * countries.length)];

  const { data } = await request("/videos", {
    params: {
      part: "snippet,contentDetails,statistics",
      chart: "mostPopular",
      regionCode: randomCountry,
      maxResults: 15,
      pageToken: nextPageToken,
    },
  });
  return { videos: data.items, nextPageToken: data.nextPageToken };
};

export const getVideosByCategory = async (catagory, nextPageToken = null) => {
  const { data } = await request("/search", {
    params: {
      part: "snippet",
      maxResults: 20,
      pageToken: nextPageToken,
      q: catagory,
      type: "video",
    },
  });

  return { videos: data.items, nextPageToken: data.nextPageToken };
};

export const getVideoById = async (id) => {
  const { data } = await request("/videos", {
    params: {
      part: "snippet,statistics",
      id: id,
    },
  });

  return data.items[0];
};

export const getVideosByChannel = async (id) => {
  const {
    data: { items },
  } = await request("/channels", {
    params: {
      part: "contentDetails",
      id: id,
    },
  });
  const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;

  const { data } = await request("/playlistItems", {
    params: {
      part: "snippet,contentDetails",
      playlistId: uploadPlaylistId,
      maxResults: 30,
    },
  });

  return data.items;
};

export const getCommentsOfVideo = async (id, pageToken = null) => {
  const { data } = await request("/commentThreads", {
    params: {
      part: "snippet",
      videoId: id,
      pageToken: pageToken,
    },
  });

  return data;
};
