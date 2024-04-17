import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {
	const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);

	const handleGoogleAuth = async () => {
		try {
			const newUser = await signInWithGoogle();
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}
			const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

			if (userSnap.exists()) {
				// login
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			} else {
				// signup
				const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: newUser.user.email.split("@")[0],
					fullName: newUser.user.displayName,
					bio: "",
					profilePicURL: newUser.user.photoURL,
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				await setDoc(doc(firestore, "userChats", newUser.user.uid), {});
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
			<Image src='data:image/jpeg;base64,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' 
			w={5} alt='Google logo' />
			<Text mx='2' color={"blue.500"}>
				{prefix} with Google
			</Text>
		</Flex>
	);
};

export default GoogleAuth;