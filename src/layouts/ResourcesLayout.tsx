import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { UpArrowIcon } from "@/components/icons/UpArrow";

const LINKS = [
  {
    href: "/resources",
    label: "Teacher Resources",
  },
  {
    href: "/resources/press",
    label: "Press & Publications",
  },
  {
    href: "/resources/research",
    label: "Research",
  },
];

export const ResourcesLayout: React.FC = ({ children }) => {
  const router = useRouter();

  const onScrollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="bg-white pb-8">
        <Navbar
          config={{
            burgerColor: "bg-primary",
            textColor: "fill-black",
            logoColor: "fill-primary",
          }}
        />

        <div className="px-32">
          <h1 className="text-6xl text-black font-bold mt-8">Resources</h1>

          <div className="flex py-8">
            {LINKS.map(({ href, label }, i) => (
              <Link key={i} href={href}>
                <a
                  className={`btn btn-transparent-outlined ${
                    router.pathname === href ? "active" : ""
                  } mr-8 font-bold text-l`}
                >
                  {label}
                </a>
              </Link>
            ))}
          </div>

          <div>{children}</div>

          <div className="w-full flex justify-end mt-8">
            <span
              role="button"
              className="text-xl flex items-center"
              onClick={onScrollToTop}
            >
              Back to top{" "}
              <UpArrowIcon className="ml-2 h-6 w-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
