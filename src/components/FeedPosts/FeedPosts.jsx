import { Container, SimpleGrid, Box, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom'
import FeedPost from "./FeedPost";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import {useDispatch , useSelector} from 'react-redux';
import { setProduct } from "../../redux/reducers/product";

const FeedPosts = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const showToast = useShowToast();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const { search } = useLocation();
  const fetchPosts = async () => {
    try {
      const postCollection = collection(firestore, "posts");
      // Create a query that orders posts by 'createdAt' field in descending order
      const postsQuery = query(postCollection, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(postsQuery);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setProduct(postsData));
    } catch (error) {
      showToast("Error", error.message, "error");
      console.error("Error fetching posts: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(search.includes('category')){
      setIsLoading(false)
      return
    };
    fetchPosts();
  }, [search]);
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
            {products.map((post) => (
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