/* eslint-disable no-unused-vars */
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { useAuth } from '../Context/AuthProvider';
import axios from 'axios';
import { FaGoogle } from "react-icons/fa6";
import { useEffect } from 'react';

export const GoogleAuth = () => {

  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();
  console.log(currentUser)
  const handleGoogleClick = async () => {
    
    try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const { data } = await axios.post('/api/auth/google', {
        username: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      console.log(data)
      const  user  = data._doc;
    
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/')
    }catch(error){
      console.log("could not sign in with google", error);
    }
  }
  useEffect(() => {
   console.log(currentUser)
  },[])
  return (
    <div 
    className='cursor-pointer shadow-md hover:bg-red-600 bg-red-700 text-white rounded flex items-center gap-2 py-2 px-3 w-fit' 
    onClick={handleGoogleClick}>
    <FaGoogle
    type="button"
    />
    <span>google</span>
    </div>
  )
}
