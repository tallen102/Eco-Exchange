import React from "react";
import { Box, Container, Flex, Tooltip } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
const HomePage = () => {
  return (
    <Container maxW={"container.lg"} h="100vh">
      {" "}
      {/* Set container height to 100vh */}
      <Flex direction="column" h="100%">
        {" "}
        {/* Display children in a column layout */}
        <Box border="1px solid" p={4} mb={4}>
          {" "}
          {/* Add mb={4} to create space between boxes */}
          {/* Carousel component */}
          Carousel
        </Box>
        <Box border="1px solid" p={4} flexGrow={1}>
          {" "}
          {/* Set flexGrow to 1 to take up rest of the screen */}
          {/* Feed posts component */}
          <FeedPosts />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
