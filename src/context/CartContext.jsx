import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Load user from localStorage and watch for changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const authToken = localStorage.getItem("authToken");
    
    if (storedUser && storedUser !== "undefined" && authToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user:", err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  // Listen for storage changes (when user logs in/out in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user" || e.key === "authToken") {
        const storedUser = localStorage.getItem("user");
        const authToken = localStorage.getItem("authToken");
        
        if (storedUser && storedUser !== "undefined" && authToken) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (err) {
            setUser(null);
          }
        } else {
          setUser(null);
          setCart([]); // Clear cart when user logs out
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const loadCart = async () => {
    console.log("Loading cart for user:", user);

    if (!user || !user.UserId) {
      setCart([]);
      return;
    }

    try {
      const productsRes = await fetch("http://localhost:3001/p/getProduct");
      const products = await productsRes.json();

      const userRes = await fetch("http://localhost:3001/u/userDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.UserId }),
      });
      const userData = await userRes.json();

      let cartDetails = userData.user.cart.map((item) => {
        const match = products.find((p) => String(p._id) === String(item.productId));
        if (match) {
          // Normalize price field
          match.PriceInclTaxes = match.PriceInclTaxes || match.priceInclTaxes;
          return { ...match, quantity: item.quantity, id: match._id };
        }
        return null;
      }).filter(Boolean);

      console.log("Setting cart:", cartDetails);
      setCart(cartDetails);

    } catch (err) {
      console.error("Error loading cart:", err);
      setCart([]);
    }
  };

  // Load cart whenever user changes
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const updateCart = async (items, id) => {
    if (!id) return;
    
    try {
      const res = await axios.post("http://localhost:3001/u/addToCart", {
        user_id: id,
        products: items
      });
      console.log("Cart updated:", res.data);
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  // Save cart to backend when cart changes
  useEffect(() => {
    if (user && user.UserId && cart.length > 0) {
      updateCart(cart, user.UserId);
    }

    // Also save to localStorage as backup
    try {
      if (user?.email) {
        localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
      }
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [cart, user]);

  // Cart actions
  const addToCart = async (item) => {
    if (!user) {
      console.log("User not logged in, cannot add to cart");
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== id));
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    // Also clear from localStorage
    try {
      if (user?.email) {
        localStorage.removeItem(`cart_${user.email}`);
      }
    } catch (err) {
      console.error("Failed to clear cart from localStorage:", err);
    }
  };

  // Function to manually reload cart (can be called after login)
  const reloadCart = () => {
    if (user) {
      loadCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        reloadCart,
        user,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}