// // import { useNavigate } from "react-router-dom";
// // import { useContext } from "react";
// // import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
// // import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
// // import { CartContext } from "../context/CartContext.jsx";
// // import { toast } from "react-toastify";

// // export default function ProductCard({
// //   id,
// //   title,
// //   dateofexp,
// //   dateofmfg,
// //   drugdetails,
// //   pharmacompany,
// //   priceincltaxes,
// //   PriceInclTaxes,
// //   categories,
// //   image,
// //   togglefavourite,
// //   isfav,
// // }) {
// //   const navigate = useNavigate();
// //   const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
// //   const handleClick = (id) => {
// //     navigate(`/products/${id}`);
// //   };

// //   const handlefavClick = (e) => {
// //     e.stopPropagation();
// //     console.log(e.currentTarget.querySelector('.product-name'));
// //     const token = localStorage.getItem("authToken");
// //     if (!token) {
// //       toast.warning("Please login to add to wishlist");
// //       navigate("/login");
// //       return;
// //     }

// //     togglefavourite({
// //       id,
// //       title,
// //       image,
// //       dateofexp,
// //       dateofmfg,
// //       drugdetails,
// //       pharmacompany,
// //       priceincltaxes,
// //       PriceInclTaxes,
// //       categories,
// //       isfav
// //     });
// //   };

// //   const cartItem = cart.find((item) => item.id === id);

// //   return (
// //     <div
// //       onClick={() => handleClick(id)}
// //       className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-black shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
// //     >
// //       {/* IMAGE + HEART */}
// //       <div className="relative w-full flex justify-center items-center pt-4">
// //         <img
// //           src={image}
// //           alt={pharmacompany}
// //           className="h-32 w-auto object-contain rounded-md"
// //         />
      
// //         { <span
// //           onClick={handlefavClick}
// //           className="absolute top-3 right-3 cursor-pointer transition-transform hover:scale-110"
// //         >
// //           {localStorage.getItem("authToken") && isfav ? (
// //             <SolidHeart className="w-7 h-7 text-red-600" />
// //           ) : (
// //             <OutlineHeart className="w-7 h-7 stroke-black hover:stroke-red-500 transition-colors" />
// //           )}
// //         </span> }
     
// //       </div>

// //       {/* INFO */}
// //       <div className="flex flex-1 flex-col justify-between p-4">
// //         <div>
// //           <h3 className="text-lg font-bold text-black">{title}</h3>
// //           <p className="text-sm text-black-400 mb-2">{categories}</p>
// //           <p className="text-xl font-black text-[var(--primary-color)]">
// //             ₹{priceincltaxes || PriceInclTaxes}
// //           </p>
// //         </div>

// //         {/* ADD / COUNTER */}
// //         <div className="mt-4 flex gap-2">
// //           {!cartItem ? (
// //             <button
// //               onClick={(e) => {
// //                 e.stopPropagation();
// //                 const token = localStorage.getItem("authToken");
// //                 if (!token) {
// //                   toast.warning("Please login to add to cart");
// //                   navigate("/login");
// //                   return;
// //                 }
// //                 addToCart(
// //                   {
// //                     id,
// //                     title,
// //                     image,
// //                     dateofexp,
// //                     dateofmfg,
// //                     drugdetails,
// //                     pharmacompany,
// //                     price: Number(priceincltaxes) || Number(PriceInclTaxes),
// //                     categories,
// //                   },
// //                   1
// //                 );
// //               }}
// //               className="px-6 py-1 rounded-lg border border-pink-500 text-white font-bold hover:text-black transition"
// //               style={{ background: "blue" }}
// //             >
// //               ADD
// //             </button>
// //           ) : (
// //             <div
// //               className="flex items-center gap-2"
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <button
// //                 onClick={() => decreaseQuantity(id)}
// //                 className="px-3 py-1 bg-blue-500 text-black font-bold rounded-md hover:bg-blue-300"
// //               >
// //                 -
// //               </button>
// //               <span className="min-w-[20px] text-center font-semibold text-black">
// //                 {cartItem.quantity}
// //               </span>
// //               <button
// //                 onClick={() => increaseQuantity(id)}
// //                 className="px-3 py-1 bg-blue-500 text-black font-bold rounded-md hover:bg-blue-300"
// //               >
// //                 +
// //               </button>
// //             </div>
// //           )}

// //           {/* Details Button */}
// //           <button
// //             className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600"
// //             style={{ background: "blue" }}
// //           >
// //             Details
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }












// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
// import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
// import { CartContext } from "../context/CartContext.jsx";
// import { toast } from "react-toastify";

// export default function ProductCard({
//   id,
//   title,
//   dateofexp,
//   dateofmfg,
//   drugdetails,
//   pharmacompany,
//   priceincltaxes,
//   PriceInclTaxes,
//   categories,
//   image,
//   togglefavourite,
//   isfav,
// }) {
//   const navigate = useNavigate();
//   const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

//   const handleClick = () => {
//     navigate(`/products/${id}`);
//   };

//   const handlefavClick = (e) => {
//     e.stopPropagation();

//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       toast.warning("Please login to add to wishlist");
//       navigate("/login");
//       return;
//     }

//     togglefavourite(id);
//   };

//   const cartItem = cart.find((item) => item.id === id);

//   return (
//     <div
//       onClick={handleClick}
//       className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-black shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
//     >
//       {/* IMAGE + HEART */}
//       <div className="relative w-full flex justify-center items-center pt-4">
//         <img
//           src={image}
//           alt={pharmacompany}
//           className="h-32 w-auto object-contain rounded-md"
//         />

//         <span
//           onClick={handlefavClick}
//           className="absolute top-3 right-3 cursor-pointer transition-transform hover:scale-110"
//           aria-label={isfav ? "Remove from wishlist" : "Add to wishlist"}
//         >
//           {isfav ? (
//             <SolidHeart className="w-7 h-7 text-red-600" />
//           ) : (
//             <OutlineHeart className="w-7 h-7 stroke-black hover:stroke-red-500 transition-colors" />
//           )}
//         </span>
//       </div>

//       {/* INFO */}
//       <div className="flex flex-1 flex-col justify-between p-4">
//         <div>
//           <h3 className="text-lg font-bold text-black">{title}</h3>
//           <p className="text-sm text-black-400 mb-2">{categories}</p>
//           <p className="text-xl font-black text-[var(--primary-color)]">
//             ₹{priceincltaxes || PriceInclTaxes}
//           </p>
//         </div>

//         {/* ADD / COUNTER */}
//         <div className="mt-4 flex gap-2">
//           {!cartItem ? (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 const token = localStorage.getItem("authToken");
//                 if (!token) {
//                   toast.warning("Please login to add to cart");
//                   navigate("/login");
//                   return;
//                 }
//                 addToCart(
//                   {
//                     id,
//                     title,
//                     image,
//                     dateofexp,
//                     dateofmfg,
//                     drugdetails,
//                     pharmacompany,
//                     price: Number(priceincltaxes) || Number(PriceInclTaxes),
//                     categories,
//                   },
//                   1
//                 );
//               }}
//               className="px-6 py-1 rounded-lg border border-pink-500 text-white font-bold hover:text-black transition"
//               style={{ background: "blue" }}
//             >
//               ADD
//             </button>
//           ) : (
//             <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
//               <button
//                 onClick={() => decreaseQuantity(id)}
//                 className="px-3 py-1 bg-blue-500 text-black font-bold rounded-md hover:bg-blue-300"
//                 aria-label="Decrease quantity"
//               >
//                 -
//               </button>
//               <span className="min-w-[20px] text-center font-semibold text-black">
//                 {cartItem.quantity}
//               </span>
//               <button
//                 onClick={() => increaseQuantity(id)}
//                 className="px-3 py-1 bg-blue-500 text-black font-bold rounded-md hover:bg-blue-300"
//                 aria-label="Increase quantity"
//               >
//                 +
//               </button>
//             </div>
//           )}

//           <button
//             className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
//             style={{ background: "blue" }}
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate(`/products/${id}`);
//             }}
//             aria-label="View details"
//           >
//             Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }













 import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { CartContext } from "../context/CartContext.jsx";
import { toast } from "react-toastify";

export default function ProductCard({
  id,
  title,
  dateofexp,
  dateofmfg,
  drugdetails,
  pharmacompany,
  priceincltaxes,
  PriceInclTaxes,
  categories,
  image,
  togglefavourite,
  isfav,
}) {
  const navigate = useNavigate();
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  const handlefavClick = (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.warning("Please login to add to wishlist");
      navigate("/login");
      return;
    }
    togglefavourite(id);
  };

  const cartItem = cart.find((item) => item.id === id);

  return (
    <div
      onClick={handleClick}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-black shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
    >
      {/* IMAGE + HEART */}
      <div className="relative w-full flex justify-center items-center pt-4">
        <img
          src={image}
          alt={pharmacompany}
          className="h-32 w-auto object-contain rounded-md"
        />

        {/* <span
          onClick={handlefavClick}
          className="absolute top-3 right-3 cursor-pointer transition-transform hover:scale-110"
          aria-label={isfav ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isfav ? (
            <SolidHeart className="w-7 h-7 text-red-600" />
          ) : (
            <OutlineHeart className="w-7 h-7 stroke-black hover:stroke-red-500 transition-colors" />
          )}
        </span> */}
      </div>

      {/* INFO */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-lg font-bold text-black">{title}</h3>
          <p className="text-sm text-black-400 mb-2">{categories}</p>
          <p className="text-xl font-black text-[var(--primary-color)]">
            ₹{priceincltaxes || PriceInclTaxes}
          </p>
        </div>

        {/* ADD / COUNTER */}
        <div className="mt-4 flex gap-2">
          {!cartItem ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const token = localStorage.getItem("authToken");
                if (!token) {
                  toast.warning("Please login to add to cart");
                  navigate("/login");
                  return;
                }
                addToCart(
                  {
                    id,
                    title,
                    image,
                    dateofexp,
                    dateofmfg,
                    drugdetails,
                    pharmacompany,
                    price: Number(priceincltaxes) || Number(PriceInclTaxes),
                    categories,
                  },
                  1
                );
              }}
              className="px-6 py-1 bg-blue-500 rounded-lg border border-pink-500 text-white font-bold hover:text-black transition"
              
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => decreaseQuantity(id)}
                className="px-3 py-1 bg-blue-500 text-black font-bold rounded-md hover:bg-blue-300"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="min-w-[20px] text-center font-semibold text-black">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => increaseQuantity(id)}
                className="px-3 py-1 bg-blue-500 text-black font-bold rounded-md hover:bg-blue-300"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}

          <button
            className="rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-400"
           
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${id}`);
            }}
            aria-label="View details"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}