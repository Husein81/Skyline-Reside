import {FaSearch} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import { useEffect, useState } from "react";


const Header = () => {

  const navigate  = useNavigate();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSearchTerm(urlParams.get('searchTerm') || "");
  },[]);



  return (
    <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Skyline</span>
            <span className="text-slate-700">Reside</span>
        </h1>
        </Link>
        <form 
        onSubmit={handleSubmit}
        className="bg-slate-100 p-3 rounded-lg flex items-center ">
            <input 
              type="search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64 "/>
            <button>
              <FaSearch className="text-slatw-600"/>
            </button>
        </form>
        <ul className="flex gap-4 item-center text-center">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to={"/about"}>  
            <li  className="hidden sm:inline text-slate-700 hover:underline">About</li>
          </Link>  
          {
          currentUser 
          ? 
          (

          <div className="gap-6 flex ">
          <Link  to={"/profile"}>
             <img className="rounded-full border w-8 h-8"src={currentUser["avatar"]} alt="" />
          </Link>
          </div>
          ) : (
          <Link to={'/sign-in'}>
              <li className="text-slate-700 hover:underline text-sm sm:text-base">
                Sign in
              </li>
          </Link>
          )}
        </ul>
        </div>
    </header>
  )
}
export default Header