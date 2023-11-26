import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Video from "../../components/video/Video";

import numeral from "numeral";

import "./_channelPage.scss";
import {
  getChannelDetails,
  subscribeChannel,
  unSubscribeChannel,
} from "../../api/channelApi";
import { getVideosByChannel } from "../../api/videoApi";
import { checkSubscriptionStatus } from "../../api/channelApi";
import { login } from "../../store/actions/authAction";
//
import { setError } from "../../store/slices/videoSlice";

const ChannelPage = () => {
  const { channelId } = useParams();
  const [details, setDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  //const [error, setError] = useState("");
  const [subscriberId, setSubscriberId] = useState(undefined);
  const oauth = useSelector((state) => state.auth.oauth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getChannelDetails(channelId)
      .then((d) => {
        setDetails(d);
      })
      .catch((error) => {
        dispatch(setError({ error: error }));
      });
    getVideosByChannel(channelId)
      .then((d) => {
        setVideos(d);
      })
      .catch((error) => {
        dispatch(setError({ error: error }));
      });
    checkSubscriptionStatus(channelId, oauth)
      .then((d) => {
        setSubscriberId(d);
        console.log(d);
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
    <>
      <div className="px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex channelHeader__left">
          <img
            src={details?.snippet.thumbnails.default.url}
            alt=""
            className="mx-2"
          />

          <div className="ms-3 channelHeader__details">
            <h3>{details?.snippet?.title}</h3>
            <span>
              {numeral(details?.statistics?.subscriberCount).format("0.a")}{" "}
              subscribers
            </span>
          </div>
        </div>
        {!subscriberId ? (
          <button
            onClick={() => handleSubscription()}
            className="channelHeader__details__subscribe"
          >
            Subscribe
          </button>
        ) : (
          <button
            onClick={() => handleSubscription()}
            className="channelHeader__details__subscribed"
          >
            Subscribed
          </button>
        )}
      </div>

      <Container>
        <Row className="mt-2">
          {videos
            ? videos?.map((video) => (
                <Col md={4} lg={3} sm={6}>
                  <Video video={video} ChannelPage={true} />
                </Col>
              ))
            : [...Array(15)].map(() => (
                <Col md={6} lg={4}>
                  <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                    <Skeleton width="100%" height="140px" />
                  </SkeletonTheme>
                </Col>
              ))}
        </Row>
      </Container>
    </>
  );
};

export default ChannelPage;
