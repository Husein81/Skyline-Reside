import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { GoogleAuth } from '../components/GoogleAuth';

const SignUp = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [error, setError] =useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true)
      const {data} = await axios.post('/api/auth/signup',formData);
      console.log(data)
      setError(null);
      
      navigate('/')
    }catch(error){
    setError(error.response.data.message);
    }
    setLoading(false)
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
        <input type="text" placeholder="username"className="border p-3 rounded-lg"name="username" onChange={handleChange} autoComplete='username'/>
        <input type="email" placeholder="email"className="border p-3 rounded-lg"name="email" onChange={handleChange} autoComplete='current-email'/>
        <input type="password" placeholder="password"className="border p-3 rounded-lg"name="password" onChange={handleChange} autoComplete='current-password'/>
        <button 
        disabled={loading} 
        className="bg-slate-700 text-white rounded-lg  p-3 disabled:opacity-80 uppercase hover:opacity-95 ">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <GoogleAuth/>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
export default SignUp