import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastNotification {
  id: string;
  message: string;
  subtitle?: string;
  type?: 'success' | 'info' | 'gold';
}

interface ShopContextType {
  // Navigation & Views
  currentView: 'home' | 'shop' | 'product' | 'finder' | 'about' | 'checkout' | 'order-success';
  selectedProductId: string | null;
  selectedCategory: string;
  navigateTo: (view: 'home' | 'shop' | 'product' | 'finder' | 'about' | 'checkout' | 'order-success', category?: string) => void;
  viewProduct: (productId: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Quick View
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Pricing & Discounts
  subtotal: number;
  shipping: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  discountCode: string;
  discountAmount: number;
  discountError: string;
  applyDiscount: (code: string) => boolean;
  total: number;

  // Orders
  lastOrder: OrderDetails | null;
  placeOrder: (customerInfo: OrderDetails['customer']) => void;

  // Toasts
  toasts: ToastNotification[];
  addToast: (message: string, subtitle?: string, type?: 'success' | 'info' | 'gold') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'elora_parfums_cart_v1';
const WISHLIST_STORAGE_KEY = 'elora_parfums_wishlist_v1';
const FREE_SHIPPING_THRESHOLD = 3000;

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'product' | 'finder' | 'about' | 'checkout' | 'order-success'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Cart State with local storage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return [
      {
        id: 'midnight-oud_100 ml',
        product: PRODUCTS[0],
        selectedSize: '100 ml',
        price: 4999,
        quantity: 1,
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist State with local storage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['amber-noir', 'velvet-rose'];
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Discount code
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  // Orders
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  // Sync wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  // Toasts helper
  const addToast = (message: string, subtitle?: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, subtitle, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation handlers
  const navigateTo = (view: 'home' | 'shop' | 'product' | 'finder' | 'about' | 'checkout' | 'order-success', category: string = 'all') => {
    setCurrentView(view);
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, selectedSize?: string, quantity: number = 1) => {
    const size = selectedSize || product.defaultSize;
    const sizeConfig = product.sizes.find((s) => s.size === size);
    const unitPrice = sizeConfig ? sizeConfig.price : product.price;
    const itemId = `${product.id}_${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedSize: size,
          price: unitPrice,
          quantity,
        },
      ];
    });

    addToast(`Added to your Shopping Bag`, `${product.name} (${size})`, 'gold');
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find((i) => i.id === itemId);
    setCart((prev) => prev.filter((i) => i.id !== itemId));
    if (item) {
      addToast(`Removed from Bag`, item.product.name, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast(`Removed from Wishlist`, product.name, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        addToast(`Saved to Wishlist`, product.name, 'gold');
        return [...prev, product.id];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Financial calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 250;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const applyDiscount = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    setDiscountError('');
    if (cleanCode === 'SIGNATURE15' || cleanCode === 'ELORA15') {
      const discount = Math.round(subtotal * 0.15);
      setDiscountCode(cleanCode);
      setDiscountAmount(discount);
      addToast(`Promotional Code Applied`, '15% Privilège Discount deducted', 'success');
      return true;
    } else if (cleanCode === 'WELCOME10') {
      const discount = Math.round(subtotal * 0.10);
      setDiscountCode(cleanCode);
      setDiscountAmount(discount);
      addToast(`Welcome Privilege Applied`, '10% Welcome Gift deducted', 'success');
      return true;
    } else {
      setDiscountError('Invalid luxury promotional code. Try SIGNATURE15');
      return false;
    }
  };

  const total = Math.max(0, subtotal - discountAmount + shipping);

  const placeOrder = (customerInfo: OrderDetails['customer']) => {
    const orderId = `ELP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      orderId,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping,
      total,
      customer: customerInfo,
    };

    setLastOrder(newOrder);
    setCart([]);
    setDiscountAmount(0);
    setDiscountCode('');
    setCurrentView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast('Your ÉLORA Order is Confirmed', `Order #${orderId} has been registered`, 'success');
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        selectedProductId,
        selectedCategory,
        navigateTo,
        viewProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        subtotal,
        shipping,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        discountCode,
        discountAmount,
        discountError,
        applyDiscount,
        total,
        lastOrder,
        placeOrder,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
