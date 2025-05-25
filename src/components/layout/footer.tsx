"use client";
import Link from "next/link";
import React from "react";
import footerCategories from "@/data/footerCategories.json";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Other");
  return (
    <footer className="flex flex-col gap-10 py-6 max-w-10/12 mx-auto">
      <div className="flex flex-wrap gap-12">
        <div className="flex flex-col flex-wrap">
          <div className="font-bold">{t("Policies")}</div>
          <div className="flex flex-col mt-3">
            {footerCategories.Policies.map((policy) => (
              <Link
                key={policy.id}
                href={policy.url}
                className="text-nowrap underline-offset-2 hover:underline"
              >
                {t(policy.key)}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-wrap">
          <div className="font-bold">{t("Information")}</div>
          <div className="flex flex-col mt-3">
            {footerCategories.Information.map((info) => (
              <Link
                key={info.id}
                href={info.url}
                className="text-nowrap underline-offset-2 hover:underline"
              >
                {t(info.key)}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-wrap">
          <div className="font-bold">{t("Contact & About Us")}</div>
          <div className="flex flex-col mt-3">
            {footerCategories.More.map((contact) => (
              <Link
                key={contact.id}
                href={contact.url}
                className="text-nowrap underline-offset-2 hover:underline"
              >
                {t(contact.key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-24 mb-12">
        <Link
          href="/"
          className="flex max-sm:flex-wrap items-center gap-x-1 text-nowrap text-base font-medium"
        >
          <span className="text-nowrap underline-offset-2 hover:underline">
            © {new Date().getFullYear()} SF Records
          </span>
        </Link>
        <div className="flex max-sm:justify-center max-sm:flex-wrap items-center gap-x-1 text-nowrap text-base font-medium">
          Built by
          <Link href="https://lparisi.it" target="_blank">
            <span className="text-nowrap underline-offset-2 hover:underline">
              ❤️ Leonardo Parisi
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
