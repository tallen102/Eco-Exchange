import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useShowToast from "../hooks/useShowToast";
import { useSearchParams } from "react-router-dom";

const useFetchPostById = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postCollection = collection(firestore, "posts");
        const querySnapshot = await getDocs(postCollection);
        const specificPost = querySnapshot.docs.find((doc) => doc.id === id);

        if (specificPost) {
          setPosts({ id: specificPost.id, ...specificPost.data() });
        } else {
          console.error("Post not found with id: ", id);
        }
      } catch (error) {
        showToast("Error", error.message, "error");
        console.error("Error fetching posts: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [id, showToast]);

  return { posts, isLoading };
};

export default useFetchPostById;
