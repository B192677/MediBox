import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { themeContext } from "../App";
import { CartContext } from "../context/CartContext.jsx";
import { toast } from "react-toastify";

export default function ProductView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const [item, setItem] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const [day, month, year] = dateStr.split("-");
    return new Date(`${year}-${month}-${day}`).toLocaleDateString();
  };

  useEffect(() => {
    fetch("http://localhost:3001/p/getproduct")
      .then((res) => res.json())
      .then((data) => {
        const foundItem = data.find((p) => String(p._id) === id);
        if (foundItem) {
          // Normalize the price field
          foundItem.PriceInclTaxes = foundItem.PriceInclTaxes || foundItem.priceInclTaxes;
          console.log("Product found with price:", foundItem.PriceInclTaxes); // Debug log
        }
        setItem(foundItem || null);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setItem(null);
      });
  }, [id]);

  if (!item) {
    return <h2 className="text-center text-red-500 mt-10">Loading</h2>;
  }

  const handleAddToCart = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.warning("Please login to add a product to cart");
      navigate("/login");
      return;
    }
    addToCart(item, quantity);
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.warning("Please login to buy a product");
      navigate("/login");
      return;
    }
    navigate("/checkoutpage");
  };

  // Assuming you have stock count inside item, fallback 500 if missing
  const stockCount = item.stock || 500;

  return (
    <div className="min-h-screen flex justify-center items-start py-12 px-4 mb-10">
      <div className="max-w-5xl bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-10 w-full fixed">
        {/* Image */}
        <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-md">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-900 mr-200 mt-3"
            style={{ color: "blue", background: "white" }}
          >
            {/* Back Icon */}
            <svg
              fill="currentColor"
              height="24"
              width="24"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </button>
          <img
            src={item.image}
            alt={item.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1">
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            {item.title}
          </h1>

          {/* Description */}
          <p className="text-gray-700 mb-6 max-w-xl">{item.description}</p>

          {/* Product Details Box */}
          <div className="bg-blue-100 rounded-md p-6 max-w-md mb-8">
            <h2 className="font-semibold text-lg mb-4">Product Details</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Active Ingredient</span>
                <span className="font-semibold">
                  {item["Drug details"] || item.Drugdetails || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date OF Mfg</span>
                <span className="font-semibold">
                  {formatDate(item["Date of Mfg"] || item.DateofMfg)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Date of Exp</span>
                <span className="font-semibold">
                  {formatDate(item["Date of Exp"] || item.DateofExp)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pharma Company</span>
                <span className="font-semibold">
                  {item["Pharma company"] || item.PharmaCompany}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Price</span>
                <span className="font-semibold text-lg text-green-600">
                  ₹{item.PriceInclTaxes}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Category</span>
                <span className="font-semibold">{item["Categories"]}</span>
              </div>
            </div>
          </div>

          {/* Price and Stock */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-blue-800">
              ₹{item.PriceInclTaxes || "9.99"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}