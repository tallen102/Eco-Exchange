import React from "react";
import { Box, Container, Flex, Image } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";

const HomePage = () => {
  return (
    <>
      <Box mb={4} overflow="hidden" height="100px"> 
        <Image src="gannonarch.webp" alt="Beautiful archway at Gannon University" width="100%" height="100%" objectFit="cover" />
      </Box>
      <Container maxW={"container.lg"} h="100vh">
        <Flex direction="column" h="100%">
          <Box  p={4} flexGrow={1}>
            <FeedPosts />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default HomePage;
