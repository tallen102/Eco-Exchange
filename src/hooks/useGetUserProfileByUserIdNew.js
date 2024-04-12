import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUserId = (createdBy) => {
  const [isLoading, setIsLoading] = useState(true);

  const showToast = useShowToast();
  const [userProfileData, setUserProfileData] = useState({});
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const postCollection = collection(firestore, "users");
        const querySnapshot = await getDocs(postCollection);
        const userData = querySnapshot.docs.find((doc) => {
          return doc.data().uid === createdBy;
        });

        if (userData) {
          setUserProfileData({ id: userData.id, ...userData.data() });
        } else {
          console.error("userData not found with id: ");
        }
      } catch (error) {
        showToast("Error", error.message, "error");
        console.error("Error fetching posts: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [createdBy, showToast]);

  return { isLoading, userProfileData, setUserProfileData, createdBy };
};

export default useGetUserProfileByUserId;
