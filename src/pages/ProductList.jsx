import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CategorySlider from "../components/slider";
import { CartContext } from "../context/CartContext";
import logo from "../components/logo.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Pagination from "@mui/material/Pagination";
import Navbar from "../components/Navbar";

function ProductList({ togglefavourite, favourite }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const mountedRef = useRef(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 32;

  const categories = [
    "All",
    "Injections",
    "Syrups for Kids",
    "Syrups for Elders",
    "Ointments",
    "Tablets",
    "Capsules",
    "Drops",
    "Powders",
    "Supplements",
    "Ayurvedic",
    "Homeopathic",
    "First Aid",
    "Pain Relief",
    "Vitamins & Minerals",
    "Antibiotics",
    "Antiseptics",
    "Skin Care",
    "Dental Care",
  ];

  // Read category from query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromQuery = queryParams.get("category") || "All";
    setSelectedCategory(categoryFromQuery);
    setCurrentPage(1);
  }, [location.search]);

  // User login detection
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token && userData && userData !== "undefined") {
      try {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    clearCart();
    setIsLoggedIn(false);
    setUser(null);
    setUserMenuOpen(false);
    navigate("/");
  };

  // Close user menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      const dropdown = document.getElementById("user-menu-dropdown");
      const button = document.getElementById("user-menu-button");
      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        button &&
        !button.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch products with normalized price fields
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/p/getproduct", {
        params: { t: Date.now() },
        headers: { "Cache-Control": "no-cache" },
      });
      if (mountedRef.current) {
        const normalizedProducts = Array.isArray(res.data)
          ? res.data.map((product) => ({
              ...product,
              PriceInclTaxes: product.PriceInclTaxes || product.priceInclTaxes,
              priceInclTaxes: product.PriceInclTaxes || product.priceInclTaxes,
            }))
          : [];
        setProducts(normalizedProducts);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchProducts();

    const interval = setInterval(fetchProducts, 10000);

    const onFocus = () => {
      fetchProducts();
    };
    const onVisibility = () => {
      if (!document.hidden) fetchProducts();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mountedRef.current = false;
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Filter products by category and search term
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (item["Categories"] || "").toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = (item.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      {/* HEADER */}
     <header className="w-full bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8 min-w-0">
           {/* <div className="flex items-center gap-3 text-xl md:text-2xl font-bold text-gray-900 flex-shrink-0">
              <img src={logo} alt="MediBox Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
              <span className="whitespace-nowrap">MediBox</span>
            </div>
           
           {/* <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-slate-600 hover:text-slate-900">Home</Link>
              <Link to="/products" className="text-slate-900 font-bold">
                Products
              </Link>
              <Link to="/about" className="text-slate-600 hover:text-slate-900">About Us</Link>
              <Link to="/contact" className="text-slate-600 hover:text-slate-900">Contact</Link>
              <Link to="/toggleWishlist" className="text-slate-600 hover:text-slate-900">wishlist</Link>
            </nav>*/}
           {/* <Navbar/>*/}
          </div>
          <div className="flex items-center gap-4">
            {/* <Link to="/cart" className="relative inline-flex items-center gap-2 text-black hover:text-[#119ad4]">
              <FaShoppingCart className="text-2xl shrink-0" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 right-0 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalQuantity}
                </span>
              )}
            </Link> */}

             {isLoggedIn ? ( 
              <div className="relative">
                <button
                  id="user-menu-button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  title={user?.name}
                  className="w-9 h-9 md:w-10 md:h-10 bg-blue-500 text-white font-bold flex items-center justify-center hover:bg-blue-700 transition select-none rounded-full"
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </button>
                {userMenuOpen && (
                  <div
                    id="user-menu-dropdown"
                    className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-2 z-20"
                  >
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-1 text-blue-700 hover:bg-red-500 hover:text-white rounded"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-white text-black px-3 py-2 rounded hover:bg-gray-100 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-xl font-semibold text-black mb-6">Find the medicines you need, quickly and easily.</p>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for your Medicine..."
            className="w-full min-w-0 border-2 border-gray-300 bg-white py-3 px-4 text-black placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 rounded-md"
          />
        </div>

        {/* Categories buttons */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                  navigate(`/products?category=${encodeURIComponent(cat)}`);
                }}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-center min-w-0 max-w-xs break-words whitespace-normal ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-blue-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading && products.length === 0 ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((item, index) => (
                <div key={item._id || index} className="min-w-0">
                  <ProductCard
                    id={item._id}
                    title={item["title"]}
                    Categories={item["Categories"]}
                    dateofmfg={item["DateofMfg"]}
                    dateofexp={item["DateofExp"]}
                    priceincltaxes={item["PriceInclTaxes"]}
                    pharmacompany={item["Pharmacompany"]}
                    drugdetails={item["Drugdetails"]}
                    image={item.image}
                    togglefavourite={togglefavourite}
                    isfav={favourite.some((fav) => fav.id === item._id)}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 px-2">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => {
                  setCurrentPage(value);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                shape="rounded"
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                    minWidth: 36,
                    height: 36,
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#6bc4ebff",
                    color: "white",
                    fontWeight: "bold",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: "#d6eaf8",
                  },
                }}
              />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No products found in this category.</p>
        )}

        {/* Category Slider */}
        <div className="mt-10">
          <CategorySlider />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductList;