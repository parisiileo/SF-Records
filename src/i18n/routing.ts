import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "he"],
  defaultLocale: "en",
  localeDetection: false,
  localePrefix: "always",
});
