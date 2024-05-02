import React, { useContext, useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from "../../context/ChatContext";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";
import { Button } from '@chakra-ui/react';
import DetailsModal from './DetailsModal';
import {useSearchParams} from 'react-router-dom'

const Iteminfo = () => {
  const [authUser] = useAuthState(auth);
  const { data } = useContext(ChatContext);
  const [postDetails, setPostDetails] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const isPost =searchParams.get("post") ? true : false;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchPostDetails = async (postId) => {
      try {
        const postDoc = await getDoc(doc(firestore, "posts", postId));
        if (postDoc.exists()) {
          setPostDetails(postDoc.data());
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    const unSub = onSnapshot(doc(firestore, "userChats", authUser.uid), (doc) => {
      if (doc.exists()) {
        const userChatsData = doc.data();
        const entry = Object.entries(userChatsData).find(([key, value]) => key === data.chatId);
        if (entry) {
          fetchPostDetails(entry[1].userInfo.postId);

        }
        else 
        {
          fetchPostDetails(data.user.postId);
        }

      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div style={{ maxWidth: "90%", margin: "20px auto", fontWeight: "bold" }}>
      {postDetails &&
      (
          <>
            <img src={postDetails.imageURL} alt="" />
            <h3 style={{ fontSize: "18px", marginTop: "20px" }}>
              {postDetails.title}
            </h3>
            {postDetails.price && (
              <>
                <h2 style={{ fontSize: "24px" }}>${postDetails.price}</h2>
                <Button
                  onClick={openModal}
                  marginTop="20px"
                 // color="#09a97d"
                  border="1px solid "
                  //borderRadius={30}
                  bg="transparent"
                >
                  See Item details
                </Button>
              </>
            )}

            <DetailsModal
              isOpen={isModalOpen}
              onClose={closeModal}
              postDetails={postDetails}
            />
          </>
        )}
    </div>
  );
}

export default Iteminfo