

 

import React from "react";
import ProductCard from "../components/ProductCard";

function WishList({ favourites, togglefavourite }) {
  if (favourites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-svg-download-png-11838277.png"
        alt="Empty wishlist"
        className="w-52 h-52 object-contain mb-6"
      />
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
           Your Wishlist IS Empty
        </h1>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {favourites.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          togglefavourite={togglefavourite}
          isfav={favourites.some((fav) => fav.id === product.id)} // dynamic check
        />
      ))}
    </div>
  );
}

export default WishList;

  



	
