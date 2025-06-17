import { createContext, useEffect, useState } from "react";
import useFetch from "../useFetch";
import { useContext } from "react";
import toast from "react-hot-toast";

const CategoryContext = createContext();
const UseCateContext = () => useContext(CategoryContext);

export default UseCateContext;

export function EcommerceProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    const storedwishlist = localStorage.getItem("wishlist");
    if (storedwishlist) {
      setWishlist(JSON.parse(storedwishlist));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const { data, error, loading } = useFetch(
    `${import.meta.env.VITE_BASE_API_URL}/categories`
  );

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        toast.success("Added to cart");
        return updatedCart;
      } else {
        toast.success("Added to cart");
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Change quantity of an existing product
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p._id !== productId));
  };

  const clearCart = () => setCart([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id);
      if (exists) {
        toast("Already in wishlist!");
        return prev;
      }
      toast.success("Added to Wishlist");
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
  };

  return (
    <CategoryContext.Provider
      value={{
        data,
        error,
        loading,
        cart,
        setCart,
        wishlist,
        searchTerm,
        setSearchTerm,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
