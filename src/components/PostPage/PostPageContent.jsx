import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useSearchParams } from "react-router-dom";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { auth, firestore } from "../../firebase/firebase";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import useShowToast from "../../hooks/useShowToast";
import { getStorage, ref, deleteObject } from "firebase/storage";
import useUserProfileStore from "../../store/userProfileStore";

const PostPageContent = ({ posts }) => {
  const [searchParams] = useSearchParams();
  const storage = getStorage();

  const { isLoading, userProfile } = useGetUserProfileById(posts.createdBy);

  const [authUser] = useAuthState(auth);
  const deletePost = useUserProfileStore((state) => state.deletePost);

  const showToast = useShowToast();

  const id = searchParams.get("id");
  const deleteSpecificDoc = async () => {
    const postDocRef = doc(firestore, "posts", id);
    await deleteSpecificImageURL();
    await removeIdFromArrayInFirestore(
      "users",
      userProfile.id,
      "posts",
      posts.id
    );
    await deletePost(posts.id);
    await deleteDoc(postDocRef);

    showToast("Success", "Post removed successfully", "success");
    window.history.back();
  };

  async function deleteSpecificImageURL() {
    const imageUrl = posts.imageURL;
    try {
      const imagePath = getFolderIdFromUrl(imageUrl);

      const imageRef = ref(storage, imagePath);

      await deleteObject(imageRef);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }
  async function removeIdFromArrayInFirestore(
    collectionName,
    docId,
    field,
    idToRemove
  ) {
    try {
      const docRef = doc(firestore, collectionName, docId);

      await updateDoc(docRef, {
        [field]: arrayRemove(idToRemove),
      });
      console.log("ID removed from array successfully.");
    } catch (error) {
      console.error("Error removing ID from array:", error);
    }
  }

  function getFolderIdFromUrl(imageUrl) {
    const folderNames = decodeURIComponent(imageUrl);
    return folderNames;
  }

  return (
    <Container maxW="container.lg">
      {}{" "}
      <Box mb={4}>
        <Box>
          {posts.createdBy === authUser.uid && (
            <Stack flex direction={"row"} justifyContent="end">
              <DeleteIcon
                onClick={deleteSpecificDoc}
                // color="red.500"
                cursor={"pointer"}
                w={5}
                h={5}
                mr={2}
              />

              <EditIcon cursor={"pointer"} w={5} h={5} />
            </Stack>
          )}

          <Heading as="h1" size="md">
            {posts?.title}
          </Heading>
          {/* description */}
          <Text as="p" my={2}>
            {posts?.description}
          </Text>
          {/* price */}
          <Text as="h4" fontWeight="bold">
            {"$ " + posts.price}
          </Text>
        </Box>
        <Flex my={4}>
          <Text fontSize={{ base: 12, md: 12, lg: 16 }}>Size L </Text>
          <Text px={{ base: 1, md: 1, lg: 1.5 }}> &#x2022;</Text>
          {/* Condition */}
          <Text fontSize={{ base: 12, md: 14, lg: 16 }}>
            {posts?.condition}{" "}
          </Text>{" "}
          <Text px={{ base: 1, md: 1, lg: 1.5 }}> &#x2022;</Text>
          {/* category */}
          <Text fontSize={{ base: 12, md: 14, lg: 16 }}>
            {" "}
            {posts?.category}
          </Text>
          <Text px={{ base: 1, md: 1, lg: 1.5 }}> &#x2022;</Text>
          {/* title */}
          <Text fontSize={{ base: 12, md: 14, lg: 16 }}>{posts?.username}</Text>
        </Flex>
        <Button
          borderRadius={0}
          w={"full"}
          colorScheme="blue"
          size={"sm"}
          fontSize={14}
        >
          Buy now{" "}
        </Button>
        <Center height="50px">
          <Divider orientation="horizontal" />
        </Center>{" "}
        <Link to={`/${posts.createdBy}`} style={{ width: "100%" }}>
          <Stack direction="row" alignItems="center" mb={4}>
            <Avatar
              size="lg"
              name={userProfile?.fullName}
              src={userProfile?.profilePicURL}
            />
            <Text as="h5"> {posts?.username}</Text>
          </Stack>{" "}
        </Link>
        <Stack direction="row" alignItems="center" mb={4}>
          <Link to={`/${posts.createdBy}`} style={{ width: "100%" }}>
            {" "}
            <Button colorScheme="blue" w={"full"} variant="outline" size={"sm"}>
              {" "}
              Visit shop
            </Button>
          </Link>
          <Link to={`/chat/${posts.createdBy}?post=${id}`} style={{ width: "100%" }}>
            <Button
              w={"full"}
              colorScheme="blue"
              size={"sm"}
              variant="outline"
              fontSize={14}
            >
              Ask a question{" "}
            </Button>{" "}
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default PostPageContent;
{
  /* <Container maxW="container.lg" py={10}>
      <Box border="1px solid" p={4} mb={4}>
        <Box>
          <Heading as="h1" size="lg">Red Purse</Heading>
          <Text fontSize="25" fontWeight="bold">29.99</Text> 
          <Text fontSize="xs">Tax included</Text>
        </Box>
         Attributes
        <Box>
          <Text>Used - Good</Text>
          <Text>Category Name</Text>
        </Box>
        <Box>
          <Button variant="solid">Make an Offer</Button>
        </Box>
      </Box>
    </Container> */
}
