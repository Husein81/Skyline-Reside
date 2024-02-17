/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom'
import {GoogleAuth} from '../components/GoogleAuth';
import FacebookAuth from '../components/FacebookAuth';
import TwitterAuth from '../components/TwitterAuth';



const SignIn = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const {loading, error, signIn} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    })
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn(formData, navigate);
  };
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
        <input type="text" 
        placeholder="username" 
        className="border p-3 rounded-lg"
        name="username" 
        onChange={handleChange} 
        value={formData.username} 
        autoComplete='username'/>
        <input 
        type="password" 
        placeholder="password" 
        className="border p-3 rounded-lg"
        name="password" 
        onChange={handleChange} 
        value={formData.password} 
        autoComplete='current-password'/>
        <button 
        disabled={loading} 
        className="bg-slate-700 text-white rounded-lg p-3 disabled:opacity-80 uppercase hover:opacity-95">
        {loading ? 'Loading...' : 'Sign In'}
        </button>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
        <hr className='font-bold' />
        <div className="flex gap-4 justify-center">
        <GoogleAuth/>
        <TwitterAuth/>
        <FacebookAuth/>
        </div>
      </form>

      <div className="flex gap-2 mt-3">
        <p>Don&apos;t have an account?</p>
        <Link to="/sign-up">
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
    </div>
  )
}
export default SignIn