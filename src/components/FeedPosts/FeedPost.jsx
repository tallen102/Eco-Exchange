import React from "react";
import { Box, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PostFooter from "./PostFooter";
import { NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import useLikePost from "../../hooks/useLikePost";

const FeedPost = ({ postData }) => {
  const { handleLikePost, isLiked, likes } = useLikePost(postData);

  const onLikeClick = (e) => {
    e.stopPropagation(); // This stops the click event from bubbling up to parent elements
    handleLikePost();
  };

  return (
    <Flex direction="column">
      <Box position="relative">
        <Link to={`/postpage?id=${postData.id}`}>
          <Image
            src={postData.imageURL}
            width="182.5px"
            height="182.5px"
            borderRadius="3px"
          />
        </Link>
        <button
          onClick={onLikeClick}
          style={{
            cursor: "pointer",
            fontSize: "10px",
            position: "absolute",
            bottom: '5px',
            right: '5px',
          }}
        >
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </button>
      </Box>
      <PostFooter postData={postData} />
    </Flex>
  );
};

export default FeedPost;





