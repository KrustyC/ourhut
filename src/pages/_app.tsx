import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Script from "next/script";
import { MediaContextProvider } from "@/components/Media";
import type { NextPageWithLayout } from "@/types/app";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import netlifyIdentity from "netlify-identity-widget";
import { useState, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { COOKIE_POLICY_ACCEPTED } from "@/utils/constants";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<Readonly<unknown>>;
};

interface WindowWithGtag extends Window {
  gtag: Gtag.Gtag;
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || DefaultLayout;

  const router = useRouter();
  const [user, setUser] = useState<netlifyIdentity.User | null>(null);

  useEffect(() => {
    const hasAcceptedCookiePolicy = localStorage.getItem(
      COOKIE_POLICY_ACCEPTED
    );

    if (
      Boolean(hasAcceptedCookiePolicy) &&
      !router.pathname.startsWith("/admin")
    ) {
      (window as WindowWithGtag).gtag("consent", "update", {
        ad_storage: "granted",
      });
    }
  }, []);

  useEffect(() => {
    netlifyIdentity.on("init", (user) => {
      setUser(user);
    });

    netlifyIdentity.on("login", (user) => {
      if (router.asPath.includes("/#access_token")) {
        router.push("/admin");
      }
      setUser(user);
    });

    // on logout
    netlifyIdentity.on("logout", () => {
      setUser(null);
    });

    // connect with Netlify Identity
    netlifyIdentity.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = () => {
    netlifyIdentity.open("login");
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  if (pageProps.protected && !user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-admin-grey text-gray-700">
        <h1 className="text-gray-400 font-bold">Our Hut</h1>

        <button
          className="px-4 py-3 rounded-md mt-8 font-bold bg-gray-800 text-white"
          onClick={login}
        >
          Log In with Netlify Identity
        </button>
        <p className="mt-4">This is a private area. please log in to view.</p>
      </div>
    );
  }

  const context = {
    login,
    logout,
    user,
    authReady: !!user,
  };

  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <>
      <MediaContextProvider>
        <AuthContext.Provider value={context}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContext.Provider>
      </MediaContextProvider>
      {process.env.NEXT_PUBLIC_ENVIRONMENT === "production" && (
        <>
          <Script
            async
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <Script id="ga-script" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                gtag('js', new Date());
                
                gtag('config', '${googleAnalyticsId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
