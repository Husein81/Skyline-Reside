/* eslint-disable no-unused-vars */
import { FaTwitter } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { app } from '../firebase'
import { useAuth } from "../Context/AuthProvider";
import { TwitterAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
const TwitterAuth = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const handleTwitterClick = async () =>{
     try{
      const provider = new TwitterAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log('hi');
      const { data } = await axios.post('/api/auth/twitter', {
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      const  user = data._doc;
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      navigate('/')
    }catch(error){
      console.log("could not sign in with twitter", error);
    }
    }
    return (
      <div 
      onClick={handleTwitterClick} 
      className='cursor-pointer shadow-md hover:bg-blue-400 bg-blue-500 text-white rounded flex items-center gap-2 py-2 px-3 w-fit'>
      <FaTwitter
        type="button"
        />
        <span>twitter</span>
        </div>
      )
}
export default TwitterAuth