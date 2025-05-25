"use client";

import { type AppStore, makeStore } from "@/lib/store";
import { type PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
