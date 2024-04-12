import { Container, SimpleGrid, Box, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";

const FeedPosts = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const showToast = useShowToast();

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const postCollection = collection(firestore, "posts");
      const querySnapshot = await getDocs(postCollection);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
    } catch (error) {
      showToast("Error", error.message, "error");

      console.error("Error fetching posts: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const FeedPostSkeleton = () => (
    <Box w="182.5px" h="182.5px" bg="gray.200" borderRadius="3px" />
  );

  return (
    <Box px={4}>
      <Container maxW="container.md" py={1}>
        {isLoading ? (
          [0, 1, 2, 3].map((_, index) => (
            <Skeleton key={index} w="full" h="200px">
              <FeedPostSkeleton />
            </Skeleton>
          ))
        ) : (
          <SimpleGrid columns={4} spacing={4}>
            {posts.map((post) => (
              <FeedPost
                postData={post}
                key={post.id}
                // img={post.imageURL}
                id={post.id}
              />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default FeedPosts;
