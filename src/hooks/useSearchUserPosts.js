import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUsersPosts = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const showToast = useShowToast();

	const getPostDetails = async (category, condition) => {
		setIsLoading(true);
		setPosts([]);
		try {
            let q = collection(firestore, 'posts');

            // Add conditions for category and condition if provided
            if (category) {
				q = query(q, where('category', '==', category));
            }
            if (condition) {
                q = query(q, where('condition', '==', condition));
            }

			//filter items that are already sold 
			const querySnapshot = await getDocs(q);

			const postsData = [];
			querySnapshot.forEach((doc) => {
				if(doc.data().status !== 'sold')
				postsData.push({ ...doc.data(), id: doc.id });
			});

			setPosts(postsData);
			if (postsData.length === 0) {
				showToast("Error", "Posts not found", "error");
			}
		} catch (error) {
			showToast("Error", error.message, "error");
			setPosts([]);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, getPostDetails, posts, setPosts };
};


export default useSearchUsersPosts;