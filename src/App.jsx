import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store'
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import PostPage from "./pages/PostPage/PostPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Chat from './pages/ChatPage/Chat';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import ResetStateOnURLChange from "./hooks/useResetState";
import ContactPage from "./pages/ContactPage/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";
function App() {
  const [authUser] = useAuthState(auth);
  console.log(authUser)
  
  return (
    <Provider store={store}>
    <Router>
      <ResetStateOnURLChange />
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={authUser && authUser.emailVerified  ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!authUser || !authUser.emailVerified ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route path="/:userId" element={<ProfilePage />} />
          <Route path="/postpage" element={<PostPage />} />{" "}
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path = "privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </PageLayout>
    </Router>
    </Provider>
  );
}

export default App;
