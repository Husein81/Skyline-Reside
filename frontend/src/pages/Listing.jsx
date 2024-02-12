import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useAuth } from "../Context/AuthProvider";
import Contact from "../components/Contact";

const Listing = () => {

  SwiperCore.use([Navigation]);
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { currentUser } = useAuth();
  const [contacting, setContacting] = useState(false);

  useEffect(() => {
    const getListingDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const { data } = await axios.get(`/api/listing/get/${id}`);
        setListing(data);
      } catch (error) {
        setError(error.response.data.message);
      }
      setLoading(false);
    };
    getListingDetails();
  }, [id]);


  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center text-red-700 my-7 text-2xl">{error}</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation={true}>
            {listing.imageUrls.map((url, i) => (
              <SwiperSlide key={i}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            <FaShare className="text-slate-500" />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link Copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.title} -{" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : `$${listing.regularPrice.toLocaleString("en-US")}`}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkedAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} Off
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description -</span>{" "}
              {listing.description}
            </p>
            <ul className=" flex-wrap text-green-900 font-semibold text-sm flex items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `1 bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} bathrooms`
                  : `1 bathroom`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking Spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "UnFurnished"}
              </li>
            </ul>
            {currentUser &&
              listing.userRef !== currentUser._id &&
              !contacting && (
                <button
                  onClick={() => setContacting(true)}
                  className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                >
                  Contact Landlord
                </button>
              )}
            {contacting && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;