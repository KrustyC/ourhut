import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPageWithLayout } from "@/types/app";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import netlifyIdentity from "netlify-identity-widget";
import { useState, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { NetlifyUser } from "../types/auth";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout || DefaultLayout;

  const [user, setUser] = useState<NetlifyUser | null>(null);

  useEffect(() => {
    netlifyIdentity.on("init", (user) => {
      console.log("INITTT");
      setUser(user);
    });

    // on logout
    netlifyIdentity.on("logout", () => {
      setUser(null);
    });

    // connect with Netlify Identity
    netlifyIdentity.init();
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

  return (
    <AuthContext.Provider value={context}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  );
}
