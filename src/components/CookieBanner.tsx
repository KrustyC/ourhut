import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { CookieIcon } from "./icons/Cookie";

export const CookieBanner = () => {
  const router = useRouter();
  const [showBanner, setShowBanner] = useState(false);
  console.log(router.pathname);

  useEffect(() => {
    const hasAcceptedCookiePolicy = localStorage.getItem(
      "cookie-policy-accepted"
    );

    if (hasAcceptedCookiePolicy === null) {
      setTimeout(() => {
        setShowBanner(true);
      }, 1500);
    }
  }, []);

  const onAccept = () => {
    localStorage.setItem("cookie-policy-accepted", "true");
    setShowBanner(false);
  };

  if (!showBanner || ["/", "/privacy-policy"].includes(router.pathname)) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black py-8 px-16 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <CookieIcon />

        <p className="text-white">
          Yes, we use them too! Please accept the{" "}
          <NextLink href="/privacy-policy">
            <a className="underline text-white font-bold" target="_blank">
              {" "}
              Cookie Policy
            </a>
          </NextLink>{" "}
          to continue to use this website.
        </p>
      </div>

      <button
        className="btn btn-transparent-outlined-white transparent-outlined font-bold w-48"
        onClick={onAccept}
      >
        Accept
      </button>
    </div>
  );
};
