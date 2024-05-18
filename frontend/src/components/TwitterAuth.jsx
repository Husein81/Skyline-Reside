/* eslint-disable no-unused-vars */
import { FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { useAuth } from "../Context/AuthProvider";
import { TwitterAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";

const TwitterAuth = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const handleTwitterClick = async () => {
    try {
      const provider = new TwitterAuthProvider();
      const auth = getAuth(app);

      // Sign in with Firebase using Twitter popup
      const result = await signInWithPopup(auth, provider);

      // Extract user information from Firebase result
      const { user } = result; // Destructure result.user
      const username = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL; // Include photoURL if available

      // Send user information to backend API (assuming an API route)
      const response = await axios.post("/api/auth/twitter", {
        username,
        email,
        photoURL, // Include photoURL if sending to backend
      });

      // Handle successful API response (assuming _doc exists in response.data)
      const backendUser = response.data._doc; // Ensure _doc exists
      localStorage.setItem("currentUser", JSON.stringify(backendUser));
      setCurrentUser(backendUser);

      // Optionally, navigate to a specific route after successful login
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Twitter:", error);
      // Handle potential errors appropriately (e.g., display error message to user)
    }
  };

  return (
    <div
      onClick={handleTwitterClick}
      className="cursor-pointer shadow-md hover:bg-blue-400 bg-blue-500 text-white rounded flex items-center gap-2 py-2 px-3 w-fit"
    >
      <FaTwitter type="button" />
      <span>twitter</span>
    </div>
  );
};

export default TwitterAuth;
