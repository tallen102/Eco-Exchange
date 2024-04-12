import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import useLikePost from "../../hooks/useLikePost";

const PostFooter = ({ postData }) => {
 const {handleLikePost,isLiked,likes}= useLikePost(postData);

  

  return (
    <>
      <Flex alignItems="center" gap={24} w="full" pt={1} mb={0} mt="auto">
        {/* Price displayed first */}
        <Text>{"$" + postData.price}</Text>
        
        {/* Like button next to the price */}
        <button
          onClick={handleLikePost}
          style={{ cursor: "pointer", fontSize: "10px" }}
        >
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </button>
      </Flex>
      <Text fontWeight={600} fontSize="sm">
        {likes} likes
      </Text>
      <Flex alignItems="center" gap={2} mt={0}>
        <Text fontSize="sm" fontWeight={700}>
          {postData.title}
          <Text as="span" fontWeight={400}>
            2 hours ago
          </Text>
        </Text>
      </Flex>
    </>
  );
};

export default PostFooter;
