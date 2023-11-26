import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import numeral from "numeral";

import "./_video.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

import request from "../../api";

//
import { setError } from "../../store/slices/videoSlice";
import { useDispatch } from "react-redux";

const Video = ({ video, channelScreen }) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const navigate = useNavigate();

  //
  const dispatch = useDispatch();

  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const _videoId = id?.videoId || contentDetails?.videoId || id;

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details()
      .then()
      .catch((error) => {
        dispatch(setError({ error: error }));
      });
  }, [_videoId]);

  useEffect(() => {
    const get_channel_icon = async () => {
      try {
        const {
          data: { items },
        } = await request("/channels", {
          params: {
            part: "snippet",
            id: channelId,
          },
        });
        setChannelIcon(items[0].snippet.thumbnails.default);
      } catch (error) {
        console.log(error);
      }
    };
    get_channel_icon()
      .then()
      .catch((error) => {
        dispatch(setError({ error: error }));
      });
  }, [channelId]);

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`);
  };

  const handleChannelClick = (e) => {
    navigate(`/channel/${channelId}`);
  };
  return (
    <div className="video">
      <div className="video__thumbnail">
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          onClick={handleVideoClick}
        />
        <span className="video__thumbnail__duration">{_duration}</span>
      </div>
      <div className="video__description d-flex">
        {!channelScreen && (
          <div className="video__description__icon p3-4">
            <LazyLoadImage
              src={channelIcon?.url}
              effect="blur"
              onClick={handleChannelClick}
            />
          </div>
        )}

        <div className="video__description__detail">
          <div className="video__description__detail__title pb-2">
            <p>{title}</p>
          </div>
          {!channelScreen && (
            <div className="video__description__detail__name">
              <p className="text-white-50 small mb-0">{channelTitle}</p>
            </div>
          )}
          <div className="video__description__detail__stat">
            <span className="text-white-50 pe-2 small">
              {numeral(views).format("0.a")} views •
            </span>
            <span className="text-white-50 small">
              {moment(publishedAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
