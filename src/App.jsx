import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import PostPage from "./pages/PostPage/PostPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Chat from './pages/ChatPage/Chat';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import ResetStateOnURLChange from "./hooks/useResetState";

function App() {
  const [authUser] = useAuthState(auth);
  console.log(authUser)
  
  return (
    <Router>
      <ResetStateOnURLChange />
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!authUser ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route path="/:userId" element={<ProfilePage />} />
          <Route path="/postpage" element={<PostPage />} />{" "}
          <Route path="/chat/:id" element={<Chat />} />
          
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
