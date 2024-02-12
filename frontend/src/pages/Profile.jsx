/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";
import {
  getDownloadURL,
  getStorage,
  list,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Profile = () => {

  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] =useState(undefined);
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
  });
  const { setCurrentUser,currentUser, loading, error } =useAuth();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [showListingsError, setShowListingsError] = useState(false);
  const [listings, setListings] = useState([]);
  const listingRef = useRef(null);
  const authToken = localStorage.getItem('token')
  
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  },[file]);
  
  
    const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const handleChange = (e) =>{
    setFormData({
      ...formData,
    [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (listings.length > 0) {
      listingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [listings]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(formData)
      const { data } = await axios.put(`/api/user/update/${currentUser._id}`,formData,{
        headers:{
          'Authorization': `Bearer ${authToken}`
        }
      });
      setCurrentUser(data);
      setUpdateSuccess(true);
    }catch(error){
      console.error(error);
    }
  }
  const handleDeleteUser = async () => {
    try{
      await axios.delete(`/api/user/delete/${currentUser._id}`,{
        headers:{
          'Authorization':`Bearer ${authToken}`,
        }
      });
    }catch(error){
      console.log(error)
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const { data } = await axios.get(`/api/user/listings/${currentUser._id}`);
      setListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      await axios.delete(`/api/listing/delete/${listingId}`, { 
        headers: {
          'Authorization': `Bearer ${authToken}`,
        }
      });
      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form  className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input 
        type="file"       
        ref={fileRef}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
         
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteUser}
        >
          Delete Account
        </span>

      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully" : ""}
      </p>
      <button
        type="button"
        onClick={handleShowListings}
        className="text-green-700 w-full"
      >
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>
      {listings.length > 0 && (
        <div className="flex flex-col">
          <h1
            ref={listingRef}
            className="text-center my-7 text-2xl font-semibold"
          >
            Your Listings
          </h1>
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="flex border rounded-lg p-3 justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt={listing.title}
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.title}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button
                  className="text-red-700 uppercase"
                  onClick={() => handleListingDelete(listing._id)}
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile;