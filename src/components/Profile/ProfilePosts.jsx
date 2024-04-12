import { Box, Grid, Skeleton, VStack, Flex } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase/firebase";
import ProfilePost from "./ProfilePost";
import { useSearchParams } from "react-router-dom";
import PostFooter from "../FeedPosts/PostFooter";
import useShowToast from "../../hooks/useShowToast";

const ProfilePosts = ({ userProfilePosts }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [posts, setPosts] = useState([]);
  const showToast = useShowToast();

  const fetchPosts = async () => {
    try {
      const postCollection = collection(firestore, "posts");
      const querySnapshot = await getDocs(postCollection);
      const postsData = querySnapshot.docs
        .filter((doc) => {
          return userProfilePosts?.includes(doc.id);
        })
        .map((doc) => ({
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
  }, [userProfilePosts]);

  return (
    <Grid
      templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
      gap={1}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
          <VStack key={idx} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h="250px">contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {
        !isLoading &&
          posts.map((post) => (
            <>
              <Flex direction="column">
                <Box>
                  <ProfilePost img={post.imageURL} id={post.id} />
                </Box>
                <PostFooter postData={post} />
              </Flex>
            </>
          ))

        // <>
        //   <ProfilePost img="/img2.jpeg" />
        //   <ProfilePost img="/img3.jpeg" />
        //   <ProfilePost img="/img1.jpeg" />
        //   <ProfilePost img="/img5.jpeg" />
        //   <ProfilePost img="/img5.jpeg" />
        // </>
      }
    </Grid>
  );
};

export default ProfilePosts;
