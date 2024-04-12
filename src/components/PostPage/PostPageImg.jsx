import React from "react";
import { Box, Image } from "@chakra-ui/react";

const PostPageImg = ({ img }) => {
  return (
    <Box>
      <Image src={img} width="100%" height="100%" />
    </Box>
  );
};

export default PostPageImg;
