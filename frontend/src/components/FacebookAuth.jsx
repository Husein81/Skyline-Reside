/* eslint-disable no-unused-vars */
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { useAuth } from "../Context/AuthProvider";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";

const FacebookAuth = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleFacebookClick = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);

      // Sign in with Firebase using Facebook popup
      const result = await signInWithPopup(auth, provider);

      // Extract user information from Firebase result
      const { user } = result; // Destructure result.user
      const username = user.displayName;
      const email = user.email;

      // Send user information to backend API (assuming an API route)
      const response = await axios.post("/api/auth/facebook", {
        username,
        email,
      });

      // Handle successful API response (assuming _doc exists in response.data)
      const backendUser = response.data._doc; // Ensure _doc exists
      localStorage.setItem("currentUser", JSON.stringify(backendUser));
      setCurrentUser(backendUser);
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
      // Handle potential errors appropriately (e.g., display error message to user)
    }
  };

  return (
    <div
      onClick={handleFacebookClick}
      className="cursor-pointer shadow-md hover:bg-slate-500 bg-slate-600 text-white rounded flex items-center gap-2 py-2 px-3 w-fit"
    >
      <FaFacebook type="button" />
      <span>facebook</span>
    </div>
  );
};

export default FacebookAuth;
