import { useCreateUserWithEmailAndPassword, useSignOut } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import { sendEmailVerification } from "firebase/auth";

const useSignUpWithEmailAndPassword = () => {
	const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
	const [signOut] = useSignOut(auth);
	const showToast = useShowToast();

	const signup = async (inputs) => {
		if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
			showToast("Error", "Please fill all the fields", "error");
			return;
		}

		if(!/[0-9]/.test(inputs.password))
		{
			showToast("Error", "Please include a number", "error");
			return;
		}

		if(!/[A-Z]/.test(inputs.password))
		{
			showToast("Error", "Please include a Capital letter", "error");
			return;
		}

		if(!/[a-z]/.test(inputs.password))
		{
			showToast("Error", "Please include a lower letter", "error");
			return;
		}

		if(!(inputs.password.length >= 8) || !(inputs.password.length <= 16))
        {
			showToast("Error", "Please put over 8 to under 12 charactors", "error");
			return;
		}

		const usersRef = collection(firestore, "users");

		const q = query(usersRef, where("username", "==", inputs.username));
		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			showToast("Error", "Username already exists", "error");
			return;
		}

		try {
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}

			if (newUser) {
				const userDoc = {
					uid: newUser.user.uid,
					email: inputs.email,
					username: inputs.username,
					fullName: inputs.fullName,
					bio: "",
					profilePicURL: "",
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};

				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				await setDoc(doc(firestore, "userChats", newUser.user.uid), {});
				localStorage.setItem("user-info", JSON.stringify(userDoc));

				await sendEmailVerification(newUser.user);

				if (!newUser.user.emailVerified) {
					await signOut();
					return showToast(
						"Created",
						"Account has been created! Please verify your email with the link sent and reload the page to continue",
						"success"
					);
				}
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;