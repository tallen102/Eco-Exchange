import { GridItem, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProfilePost = ({ img, id }) => {
  return (
    <Link to={"/postpage" + "?id=" + id}>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid #dbdbdb"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.400"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        ></Flex>
        <Image
          src={img}
          alt="profile post"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        />
        {/*<PostPageImg img={img} />*/}
      </GridItem>
    </Link>
  );
};

export default ProfilePost;
