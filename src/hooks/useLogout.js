import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

const useLogout = () => {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = useAuthStore((state) => state.logout);
    const navigate = useNavigate();  // Import useNavigate to handle redirection

    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem("user-info");
            logoutUser();
            navigate('/auth', { replace: true });  // Navigate to the auth page after logout
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { handleLogout, isLoggingOut, error };
};

export default useLogout;