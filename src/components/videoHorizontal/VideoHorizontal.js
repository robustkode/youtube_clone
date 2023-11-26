import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import numeral from "numeral";

import "./_videoHorizontal.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";

import request from "../../api";

//
import { setError } from "../../store/slices/videoSlice";
import { useDispatch } from "react-redux";

const VideoHorizontal = ({ video, type, subScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
    contentDetails,
  } = video;

  const isVideo = !(id.kind === "youtube#channel" || type === "subScreen");
  const _videoId = id?.videoId || contentDetails?.videoId || id;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  //
  const dispatch = useDispatch();
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
    if (isVideo) {
      get_video_details()
        .then()
        .catch((error) => {
          dispatch(setError({ error: error }));
        });
    }
  }, [id, isVideo]);

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    if (isVideo) {
      get_channel_icon()
        .then()
        .catch((error) => {
          dispatch(setError({ error: error }));
        });
    }
  }, [channelId]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const navigate = useNavigate();

  const _channelId = resourceId?.channelId || channelId;

  const handleClick = () => {
    isVideo
      ? navigate(`/watch/${_videoId}`)
      : navigate(`/channel/${_channelId}`);
  };

  const thumbnail = !isVideo && "videoHorizontal__thumbnail__channel";

  const handleChannelClick = (e) => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <Row className="py-2 m-1 videoHorizontal" onClick={handleClick}>
      <Col
        xs={6}
        md={type === "search" ? 4 : 6}
        className="videoHorizontal__left"
      >
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className={`videoHorizontal__thumbnail ${thumbnail}  ${
            isVideo ? "rounded" : "rounded-circle"
          }`}
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        {isVideo && (
          <span className="videoHorizontal__duration">{_duration}</span>
        )}
      </Col>
      <Col
        xs={6}
        md={type === "search" ? 8 : 6}
        className="p-0 videoHorizontal__right"
      >
        <p className="mb-1 videoHorizontal__title">{title}</p>
        {isVideo && (
          <div className="videoHorizontal__details pb-2">
            <span className="text-white-50 pe-2 small">
              {numeral(views).format("0.a")} views •
            </span>
            <span className="text-white-50 small">
              {moment(publishedAt).fromNow()}
            </span>
          </div>
        )}
        <div className="my-1 videoHorizontal__channel d-flex align-items-center">
          {isVideo && (
            <LazyLoadImage
              src={channelIcon?.url}
              effect="blur"
              onClick={handleChannelClick}
            />
          )}
          <p className={isVideo ? "mb-0 text-white-50 small" : "mb-0"}>
            {channelTitle}
          </p>
        </div>

        {(type === "search" || type === "subScreen") && (
          <p className="mt-1 videoHorizontal__desc text-white-50 small">
            {description}
          </p>
        )}

        {subScreen && (
          <p className="mt-2">{video.contentDetails?.totalItemCount} Videos</p>
        )}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
