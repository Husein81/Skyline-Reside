/* eslint-disable no-unused-vars */
import { createContext, useContext, useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
  // Retrieve token and user data from localStorage
  const storedUser =JSON.parse(localStorage.getItem('currentUser'));

  // Set initial state with stored values or defaults
  const [currentUser, setCurrentUser] = useState(storedUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    // sign in method
  const signIn = async (formData, navigate) => {
    setLoading(true);
    try {
      const { data }  = await axios.post("/api/auth/signin", formData);
  
      const user = data.rest._doc;
 
      // Update state
      setCurrentUser(user);
  
      // Store data in localStorage
      const signInTime = new Date().getTime();

      localStorage.setItem('currentUser', JSON.stringify(user)); //Get Current User
      localStorage.setItem('signInTime',signInTime); //store sign-in time

      setError(null);
      navigate("/");
    
    }catch (error) {
      setError(error.response.data.message);
    }finally {
      setLoading(false);
    }
  };
  
  const signOut = async () => {
    await axios.get('/api/auth/signout');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');     
    setCurrentUser(null);
    
  };
  const checkAutoSignOut = (navigate) => {
    const signInTime = localStorage.getItem('signInTime');
    if(signInTime){
      const currentTime = new Date().getTime();
      const signInDuration = 24*60*60*1000;
      if(currentTime - parseInt(signInTime) >= signInDuration){
        signOut();
        navigate('/sign-in');
      }
    }
  }

const navigate = useNavigate(); 
useEffect(() => {
    checkAutoSignOut(navigate);
}, []);

  useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    
      if (storedUser) {
        setCurrentUser(storedUser);
      }
  }, []);
  
  const contextValue ={
      currentUser,
      setCurrentUser,
      loading,
      setLoading,
      setError,
      error,
      signIn, 
      signOut
  }
  return(
      <AuthContext.Provider value={ contextValue }>
      {children}
      </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context)
       throw new Error('useAuth must be used within an AuthProvider')
    return context;
}