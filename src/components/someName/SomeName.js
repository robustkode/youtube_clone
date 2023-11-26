import { Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import VideoHorizontal from "../videoHorizontal/VideoHorizontal";

const SomeName = ({ items, type, nextItems }) => {
  const isVideo = (id) => !(id.kind === "youtube#channel" || "subScreen");
  return (
    <Container>
      {items ? (
        <InfiniteScroll
          dataLength={items.length}
          next={nextItems}
          hasMore={true}
          loader={
            <div className="spinner-border text-danger d-block mx-auto"></div>
          }
          className="row"
        >
          {items?.map((item, i) =>
            isVideo(item.id) ? (
              <VideoHorizontal video={item} key={i} type={type} />
            ) : (
              <VideoHorizontal video={item} key={i} type={type} />
            )
          )}
        </InfiniteScroll>
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default SomeName;
