import { Container, Flex, useBreakpointValue } from "@chakra-ui/react";
import PostPageContent from "../../components/PostPage/PostPageContent";
import PostPageImg from "../../components/PostPage/PostPageImg";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useFetchPostById from "../../hooks/useFetchPostById";

const PostPage = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const { posts, isLoading } = useFetchPostById(id);

  return (
    <Container maxW="container.lg" py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        h="full"
        mx="auto"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Flex flex={1}>
          {/* Flex container for flexible content */}
          <PostPageImg img={posts.imageURL} />
        </Flex>
        <Flex flex={1} mt={{ base: 4, md: 0 }}>
          {" "}
          {/* Flex container for flexible content */}
          <PostPageContent posts={posts} />
        </Flex>
      </Flex>
    </Container>
  );
};

export default PostPage;
