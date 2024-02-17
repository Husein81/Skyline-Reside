import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile';
import Header from "./components/Header";
import {useAuth } from "./Context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import UpdateListing from "./pages/UpdateListing";


export default function App() {
  const { currentUser } =useAuth();
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
       { currentUser && <Route path="/sign-in" element={<Navigate to={'/'}/>}/>}
       { currentUser && <Route path="/sign-up" element={<Navigate to={'/'}/>}/>}
       {!currentUser && <Route path="/sign-in" element={<SignIn/>}/>}
       {!currentUser && <Route path="/sign-up" element={<SignUp/>}/>}
        <Route path="/about" element={<About/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/listing/:id" element={<Listing />}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/update-listing/:id" element={<UpdateListing />} />
        </Route>
      </Routes>
    </>
  )
}

