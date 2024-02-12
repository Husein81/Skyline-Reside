/* eslint-disable no-unused-vars */
import { FaFacebook } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import {app} from '../firebase'
import { useAuth } from "../Context/AuthProvider";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";


const FacebookAuth = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const handleFacebookClick = async () =>{
     try{
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
     
      const { data } = await axios.post('/api/auth/facebook', {
        username: result.user.displayName,
        email: result.user.email,
      });

      const  user = data._doc;
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user)
    }catch(error){
      console.log("could not sign in with facebook", error);
    }
    }
    return (
      <div 
      onClick={handleFacebookClick} 
      className='cursor-pointer shadow-md hover:bg-slate-500 bg-slate-600 text-white rounded flex items-center gap-2 py-2 px-3 w-fit'>
      <FaFacebook
        type="button"
        />
        <span>facebook</span>
        </div>
      )
}
export default FacebookAuth