import { CookieBanner } from "@/components/CookieBanner";

export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <div>
        {children}

        <CookieBanner />
      </div>
    </>
  );
};
