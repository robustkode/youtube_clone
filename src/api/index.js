import axios from "axios";
const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyD1CTlzFUxUDLFmHzBZpBJ5hK8TwYYdd5k",
  },
});

export default request;
