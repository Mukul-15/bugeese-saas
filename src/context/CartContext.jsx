"use client";

import { createContext, useContext, useEffect, useState, useMemo, useCallback, useSyncExternalStore } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "bugeese_cart_v1";

// Custom external store subscription for safe localStorage hydration without cascading renders
let cartListeners = [];
let memoryCart = [];

function emitChange() {
  for (const listener of cartListeners) {
    listener();
  }
}

function getStoredSnapshot() {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(STORAGE_KEY) || "[]";
}

function getServerSnapshot() {
  return "[]";
}

function subscribe(callback) {
  cartListeners.push(callback);
  window.addEventListener("storage", callback);
  return () => {
    cartListeners = cartListeners.filter((l) => l !== callback);
    window.removeEventListener("storage", callback);
  };
}

export function CartProvider({ children }) {
  // Sync with localStorage safely
  const rawCartString = useSyncExternalStore(subscribe, getStoredSnapshot, getServerSnapshot);

  // Parse items from snapshot
  const items = useMemo(() => {
    try {
      const parsed = JSON.parse(rawCartString);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (i) => i && typeof i.id === "string" && typeof i.price === "number" && typeof i.quantity === "number" && i.quantity > 0
        );
      }
    } catch {
      // ignore JSON parse error
    }
    return [];
  }, [rawCartString]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Helper to persist updates
  const setPersistedItems = useCallback((updater) => {
    const current = items;
    const nextItems = typeof updater === "function" ? updater(current) : updater;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
        emitChange();
      } catch (e) {
        console.warn("Failed to write cart to localStorage:", e);
      }
    }
  }, [items]);

  // Show auto-dismissing toast
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // Add Item to cart
  const addItem = useCallback((product) => {
    if (!product || !product.id) return;

    setPersistedItems((prevItems) => {
      const existingIdx = prevItems.findIndex((i) => i.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + 1,
        };
        return updated;
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || "/food/burger.jpg",
          desc: product.desc || "",
          tag: product.tag || "",
          quantity: 1,
        },
      ];
    });

    showToast(`Added "${product.name}" to cart`);
  }, [setPersistedItems, showToast]);

  // Update quantity (+ or -)
  const updateQuantity = useCallback((productId, delta) => {
    setPersistedItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  }, [setPersistedItems]);

  // Remove single item completely
  const removeItem = useCallback((productId) => {
    setPersistedItems((prevItems) => prevItems.filter((i) => i.id !== productId));
  }, [setPersistedItems]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setPersistedItems([]);
  }, [setPersistedItems]);

  // Derived totals
  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const value = useMemo(
    () => ({
      items,
      totalCount,
      subtotal,
      isDrawerOpen,
      toastMessage,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openDrawer,
      closeDrawer,
    }),
    [items, totalCount, subtotal, isDrawerOpen, toastMessage, addItem, updateQuantity, removeItem, clearCart, openDrawer, closeDrawer]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider on the Menu page");
  }
  return context;
}
