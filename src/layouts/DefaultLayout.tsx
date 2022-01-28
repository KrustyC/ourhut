import { Navbar } from "src/components/Navbar";

export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <div>
        {/* <Navbar /> */}
        {children}
      </div>
    </>
  );
};
