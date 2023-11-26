import request from ".";
import axios from "axios";

export const getChannelDetails = async (id) => {
  const { data } = await request("/channels", {
    params: {
      part: "snippet,statistics,contentDetails",
      id,
    },
  });
  return data.items[0];
};

export const checkSubscriptionStatus = async (id, oauth) => {
  try {
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${oauth}`,
      },
    });
    console.log(
      data.items.length !== 0 ? data.items[0].id : undefined,
      "channel"
    );

    return data.items.length !== 0 ? data.items[0].id : undefined;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const subscribeChannel = async (id, oauth) => {
  console.log(oauth, "kkk");
  try {
    const { data } = await axios.post(
      "https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&key=AIzaSyD1CTlzFUxUDLFmHzBZpBJ5hK8TwYYdd5k",
      {
        snippet: {
          resourceId: {
            kind: "youtube#channel",
            channelId: id,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${oauth}`,
        },
      }
    );
    return data.id;
  } catch (error) {
    console.log(error);
  }
};

export const unSubscribeChannel = async (id, oauth) => {
  console.log(oauth, "kkkk");
  try {
    const { data } = await axios.delete(
      `https://youtube.googleapis.com/youtube/v3/subscriptions?id=${id}&key=AIzaSyD1CTlzFUxUDLFmHzBZpBJ5hK8TwYYdd5k`,
      {
        headers: {
          Authorization: `Bearer ${oauth}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getSubscribedChannels = async (oauth) => {
  try {
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        mine: true,
        maxResults: 20,
      },
      headers: {
        Authorization: `Bearer ${oauth}`,
      },
    });
    const filtered = data.items.map((item) => {
      let { snippet } = item;
      return {
        id: { kind: "youtube#channel" },
        snippet: {
          channelId: snippet.channelId,
          description: snippet.description,
          thumbnails: snippet.thumbnails,
          channelTitle: snippet.title,
        },
      };
    });
    console.log(data, filtered, "channels");
    return filtered;
  } catch (error) {
    console.log(error);
  }
};
