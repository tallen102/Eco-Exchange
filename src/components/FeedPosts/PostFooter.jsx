import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { NotificationsLogo, UnlikeLogo } from "../../assets/constants";

const PostFooter = ({ postData }) => {
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(33);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <>
      <Flex alignItems="center" gap={24} w="full" pt={1} mb={0} mt="auto">
        {/* Price displayed first */}
        <Text>{"$" + postData.price}</Text>
        
        {/* Like button next to the price */}
        <button
          onClick={handleLike}
          style={{ cursor: "pointer", fontSize: "10px" }}
        >
          {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
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
