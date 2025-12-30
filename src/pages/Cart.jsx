

// src/pages/Cart.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";



export default function CartPage() {
  const { cart, removeFromCart, decreaseQuantity, increaseQuantity } =
    useContext(CartContext);
   
 const navigate = useNavigate();
 // helper to get correct price
const getPrice = (item) => {
  return Number(item.priceInclTaxes ?? item.price ?? item.PriceInclTaxes ?? 0);
};

 console.log(cart)
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <img
        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        alt="Empty cart"
        className="w-52 h-52 object-contain mb-6"
      />
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
           Your cart is empty
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
  

    
  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen w-[1000px]">
      <div className="max-w-3xl mx-auto bg-stone-50 text-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Shopping Cart</h1>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-green-700 text-black">
              <th className="pb-3">Product</th>
              <th className="pb-3 text-center">Quantity</th>
              <th className="pb-3 text-center">Unit Price</th>
              <th className="pb-3 text-center">Total</th>
              <th className="pb-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item,index) => (
              <tr key={item.id || index} className="border-b border-green-800">
                {/* Product Info */}
                <td className="py-4 px-4 flex items-center gap-4">
                    <img
                      src={item.image || "https://via.placeholder.com/60"}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-md border"
                    />
                    <span className="font-medium text-gray-800">
                      {item.title}
                    </span>
                  </td>


                {/* Quantity Controls */}
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 bg-blue-600 rounded-full hover:bg-blue-300 text-white" 
                    >
                      -
                    </button>
                    <span className="min-w-[20px] text-center text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-1 bg-blue-600 rounded-full hover:bg-blue-300 text-white"
                    >
                      +
                    </button>
                  </div>
                </td>

            
                <td className="py-4  text-black text-center">₹{getPrice(item)}</td>

           
                <td className="py-4  text-black text-center">
                  ₹{(getPrice(item) * item.quantity).toFixed(2)}
                </td>

         
                <td className="py-4 text-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-black hover:text-red-900 text-lg"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

    
        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-semibold">
            Subtotal: ₹{subtotal.toFixed(2)}
          </p>
          <button 
              onClick={() => navigate("/checkoutpage")}
          className="bg-blue-500 text-black font-bold px-6 py-2 rounded-lg hover:bg-blue-400">
            Proceed to Checkout →
          </button>
        </div>

  
        <div className="mt-4 text-center">
          <button
            onClick={() => window.history.back()}
            className="text-black hover:text-black"
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

  

