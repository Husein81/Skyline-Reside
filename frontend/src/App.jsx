import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile';
import Header from "./components/Header";
import { AuthProvider } from "./Context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import UpdateListing from "./pages/UpdateListing";


export default function App() {
  return (
    <AuthProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/listing/:id" element={<Listing />}/>
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/update-listing/:id" element={<UpdateListing />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

