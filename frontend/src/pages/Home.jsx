import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import axios from 'axios';
import { Navigation } from "swiper/modules";
import ListingCard from '../components/ListingCard'
import "swiper/css/bundle";


const Home = () => {
  const [offerListings, setOfferListing] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const getOfferListings = async () =>{
    try{
      const { data } = await axios.get('/api/listing/get?type=offer&limit=4');
      setOfferListing(data);
      getRentListings();
    }catch(error){
      console.error(error);
    }
  }

  const getRentListings = async () => {
    try{
      const { data } = await axios.get('/api/listing/get?type=rent&limit=4');
      setRentListings(data);
      getSaleListings();
    }catch(error){
      console.error(error);
    }
  }

  const getSaleListings = async () =>{
    try{
      const { data } = await axios.get('/api/listing/get?type=sale&limit=4');
      setSaleListings(data);
    }catch(error){
      console.error(error);
    }
  };
  getOfferListings();
  }, []);

  return (
    <main>
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl capitalize">
          find your next <span className="text text-slate-500">perfect</span>
          <br /> place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Skyline Reside is the best place to find your next perfect place to live.
          <br />
          we have a wide range of property for you to choose from.
        </div>
        <Link to={'/search'}>
          let&apos;s get started
        </Link>
        {/* Swiper */}
        <Swiper navigation>
          {offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div className="h-[500px]"
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: "cover"
              }}></div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* listing results */}
        <div className="max-w-6xl mx-auto flex p-3 flex-col gap-8 my-10">
          {offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600 capitalize">
                  recent offers
                </h2>
                <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}>
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingCard listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          
          {rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </main>
  )
}
export default Home