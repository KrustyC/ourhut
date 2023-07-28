import { COOKIE_POLICY_ACCEPTED } from "@/utils/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface UsePageViewTrackProps {
  title: string;
}

export const usePageviewTracking = ({ title }: UsePageViewTrackProps) => {
  const router = useRouter();

  useEffect(() => {
    const userHasAcceptedCookiePolicy = localStorage.getItem(
      COOKIE_POLICY_ACCEPTED
    );

    if (!userHasAcceptedCookiePolicy || !(window as any).gtag) {
      return;
    }

    const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

    (window as any).gtag("config", googleAnalyticsId, {
      page_location: window.location.href,
      page_title: title,
      page_path: router.pathname,
    });
  }, [router.pathname, title]);
};
