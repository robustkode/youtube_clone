import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./_comments.scss";

import Comment from "../comment/Comment";

import InfiniteScroll from "react-infinite-scroll-component";

import { getCommentsOfVideo } from "../../api/videoApi";

//
import { setError } from "../../store/slices/videoSlice";

const Comments = ({ videoId, totalComments }) => {
  const [comments, setComments] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  //
  const dispatch = useDispatch();

  useEffect(() => {
    getCommentsOfVideo(videoId)
      .then((d) => {
        setNextPageToken(d.nextPageToken);
        setComments(d.items);
      })
      .catch((error) => {
        dispatch(setError({ error: error }));
      });
  }, [videoId]);

  const _comments = comments
    ? comments?.map((comment) => comment.snippet.topLevelComment.snippet)
    : [];

  const moreComments = () => {
    getCommentsOfVideo(videoId, nextPageToken)
      .then((d) => {
        setNextPageToken(d.nextPageToken);
        setComments([...comments, ...d.items]);
        console.log(d.nextPageToken);
      })
      .catch((error) => {
        dispatch(setError({ error: error }));
      });
  };
  return (
    <div className="comments">
      {!comments ? (
        <p className="comments__error text-center">Comments are turned off.</p>
      ) : (
        <>
          <p>{totalComments} Comments</p>

          <InfiniteScroll
            dataLength={comments.length}
            next={moreComments}
            hasMore={true}
            loader={
              <div className="spinner-border text-danger d-block mx-auto"></div>
            }
          >
            <div className="comments__list">
              {_comments?.map((comment, i) => (
                <Comment comment={comment} key={i} />
              ))}
            </div>
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default Comments;
