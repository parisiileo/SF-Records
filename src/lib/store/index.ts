import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cart from "@/lib/store/slices/cart";

let alreadyCalled = false;
let storeInstance = configureStore({
  reducer: combineReducers({
    cart,
  }),
  devTools: process.env.NODE_ENV !== "production",
});

export const makeStore = () => {
  if (!alreadyCalled) {
    alreadyCalled = true;
    storeInstance = configureStore({
      reducer: combineReducers({
        cart,
      }),
      devTools: process.env.NODE_ENV !== "production",
    });
  }

  return storeInstance;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
