import "./_homepage.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Container, Row } from "react-bootstrap";
import "react-loading-skeleton/dist/skeleton.css";

import Video from "../../components/video/Video";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import SkeletonVideo from "../../components/skeleton/SkeletonVideo";

import InfiniteScroll from "react-infinite-scroll-component";

import { getPopularVideos } from "../../store/actions/videoAction";
import { Error } from "./Error";

const HomePage = ({ error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos(dispatch));
  }, []);

  const videos = useSelector((state) => state.video.videos);

  const nextVideos = () => {
    dispatch(getPopularVideos(dispatch));
  };

  return (
    <>
      <div className="categoriesBar"></div>
      <CategoriesBar />
      {error ? (
        <Error />
      ) : (
        <Container>
          <div className="hompage__videos">
            <Row>
              <InfiniteScroll
                dataLength={videos?.length || 20}
                next={nextVideos}
                hasMore={true}
                loader={
                  <div className="spinner-border text-danger d-block mx-auto"></div>
                }
                className="row"
              >
                {videos
                  ? videos.map((video) => (
                      <Col lg={3} md={4} sm={6} xs={8}>
                        <Video video={video} key={video.id} />
                      </Col>
                    ))
                  : [...Array(20)].map(() => (
                      <Col lg={3} md={4}>
                        <SkeletonVideo />
                      </Col>
                    ))}
              </InfiniteScroll>
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};

export default HomePage;
