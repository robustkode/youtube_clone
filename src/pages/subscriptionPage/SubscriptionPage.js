import "./_subscriptionPage.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../../store/actions/videoAction";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Container } from "react-bootstrap";

const SubscriptionPage = () => {
  // useEffect(() => {
  //   dispatch(getSubscribedChannels());
  // }, [dispatch]);

  return {};
  // <Container fluid>
  //   {!loading ? (
  //     videos?.map((video) => (
  //       <VideoHorizontal video={video} key={video.id} subScreen />
  //     ))
  //   ) : (
  //     <SkeletonTheme color="#343a40" highlightColor="#3c4147">
  //       <Skeleton width="100%" height="160px" count={20} />
  //     </SkeletonTheme>
  //   )}
  // </Container>
  //);
};

export default SubscriptionPage;
