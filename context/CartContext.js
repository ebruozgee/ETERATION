import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);

      const storedCartItems = localStorage.getItem("cartItems");
      const storedTotalPrice = localStorage.getItem("totalPrice");

      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }

      if (storedTotalPrice) {
        setTotalPrice(JSON.parse(storedTotalPrice));
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    }
  }, [cartItems, totalPrice, isClient]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setTotalPrice(
      (prevPrice) => parseFloat(prevPrice) + parseFloat(product.price)
    );
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems
      .map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCartItems);
    setTotalPrice(
      (prevPrice) => parseFloat(prevPrice) - parseFloat(product.price)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    if (isClient) {
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalPrice");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice: totalPrice.toFixed(2),
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
