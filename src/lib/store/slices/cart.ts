import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "cart";

export const loadCartFromLocalStorage = (): Product[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveCartToLocalStorage = (cartData: Product[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
};

type CartState = {
  cart: {
    loading: boolean;
    error: string | null;
    data: Product[];
  };
};

type CartPayload = {
  type: "loading" | "error" | "data";
  error: string | null;
  data: Product[] | null;
};

const initialCartState: CartState = {
  cart: {
    loading: false,
    error: null,
    data: loadCartFromLocalStorage(),
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    setCart(state, action: PayloadAction<CartPayload>) {
      switch (action.payload.type) {
        case "error":
          state.cart.loading = false;
          state.cart.error = action.payload.error;
          break;
        case "data":
          state.cart.loading = false;
          state.cart.error = null;
          state.cart.data = action.payload.data || [];
          saveCartToLocalStorage(state.cart.data);
          break;
        case "loading":
        default:
          state.cart.loading = true;
          state.cart.error = null;
          break;
      }
    },
    addPackage(state, action: PayloadAction<Product>) {
      state.cart.data.push(action.payload);
      saveCartToLocalStorage(state.cart.data);
    },
    removePackage(state, action: PayloadAction<string>) {
      state.cart.data = state.cart.data.filter(
        (pkg) => pkg.id !== Number(action.payload)
      );
      saveCartToLocalStorage(state.cart.data);
    },
    clearCart(state) {
      state.cart.data = [];
      saveCartToLocalStorage(state.cart.data);
    },
  },
});

export const { setCart, addPackage, removePackage, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
