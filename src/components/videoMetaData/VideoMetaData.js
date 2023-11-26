import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HelmetCustom from "../HelmetCustom";
import moment from "moment";
import numeral from "numeral";

import "./_videoMetaData.scss";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import { login } from "../../store/actions/authAction";

import {
  checkSubscriptionStatus,
  getChannelDetails,
  subscribeChannel,
  unSubscribeChannel,
} from "../../api/channelApi";
import { setError } from "../../store/slices/videoSlice";

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const [channelDetails, setChannelDetails] = useState(undefined);
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount } = statistics;
  const [subscriberId, setSubscriberId] = useState(undefined);
  const oauth = useSelector((state) => state.auth.oauth);
  const dispatch = useDispatch();

  useEffect(() => {
    getChannelDetails(channelId)
      .then((d) => {
        setChannelDetails(d);
      })
      .catch((error) => {
        dispatch(setError({ error: error }));
      });
    checkSubscriptionStatus(channelId, oauth)
      .then((d) => {
        setSubscriberId(d);
      })
      .catch((error) => {
        dispatch(setError({ error: error }));
      });
  }, [channelId]);

  const handleSubscription = () => {
    if (!oauth) {
      dispatch(login());
      return;
    }
    if (subscriberId) {
      unSubscribeChannel(subscriberId, oauth)
        .then((d) => {
          setSubscriberId(undefined);
        })
        .catch((error) => {
          dispatch(setError({ error: error }));
        });
    } else {
      subscribeChannel(channelId, oauth)
        .then((d) => {
          setSubscriberId(d);
        })
        .catch((error) => {
          dispatch(setError({ error: error }));
        });
    }
  };
  return (
    channelDetails && (
      <div className="py-2 videoMetaData">
        <HelmetCustom title={channelTitle} />
        <p className="videoMetaData__title text-white">{title}</p>
        <div className="videoMetaData__thumbnail py-1 d-flex justify-content-between align-items-center">
          <div className="d-flex videoMetaData__thumbnail__channel justify-content-between">
            <div className="d-flex">
              <img
                src={channelDetails.snippet.thumbnails.default.url}
                alt=""
                className="rounded-circle"
              />

              <div className="d-flex flex-column mx-2">
                <span>{channelTitle}</span>
                <span className="text-white-50 small">
                  {numeral(channelDetails.statistics.subscriberCount).format(
                    "0.a"
                  )}{" "}
                  Subscribers
                </span>
              </div>
            </div>

            {!subscriberId ? (
              <button
                onClick={() => handleSubscription()}
                className="px-3 my-2 border-0 btn btn-black`"
              >
                Subscribe
              </button>
            ) : (
              <button
                onClick={() => handleSubscription()}
                className="px-3 my-2 border-0 btn btn-gray subscribed"
              >
                Subscribed
              </button>
            )}
          </div>

          <div className="videoMetaData__thumbnail__likes p-2 px-4">
            <span className="me-2">
              <MdThumbUp size={20} /> {numeral(likeCount).format("0.a")}
            </span>
            <span>|</span>
            <span className="ms-2">
              <MdThumbDown size={20} />
            </span>
          </div>
        </div>
        <div className="videoMetaData__description">
          <div className="videoMetaData__description__stat">
            <p>
              {numeral(viewCount).format("0.a")} views{" "}
              {moment(publishedAt).fromNow()}
            </p>
          </div>
          <ShowMoreText
            lines={2}
            more={<p className="show_more_descrip text-white-50">show more</p>}
            less={<p className="show_more_descrip text-white-50">show less</p>}
            anchorClass="showMoreText"
            expanded={false}
          >
            {description}
          </ShowMoreText>
        </div>
      </div>
    )
  );
};

export default VideoMetaData;
