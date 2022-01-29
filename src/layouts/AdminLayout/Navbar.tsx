import Image from "next/image";

interface NavBarProps {
  onLogout: VoidFunction;
}

export const NavBar: React.FC<NavBarProps> = ({ onLogout }) => (
  <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
    <div className="px-3 py-3 lg:px-5 lg:pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start z-40">
          <div
            className="text-xl flex items-center lg:ml-2.5 z-40"
            style={{ zIndex: "500" }}
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Location_dot_orange.svg/480px-Location_dot_orange.svg.png"
              className="h-3 mr-2"
              width="20"
              height="20"
              alt="Windster Logo"
            />
            <span className="self-center font-medium whitespace-nowrap text-gray-800">
              Our Hut
            </span>
          </div>
        </div>

        <button className="btn-admin btn-dark btn-sm" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  </nav>
);