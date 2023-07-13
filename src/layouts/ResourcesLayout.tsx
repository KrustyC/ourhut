import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { UpArrowIcon } from "@/components/icons/UpArrow";
import { Media } from "@/components/Media";

const LINKS = [
  {
    href: "/resources",
    label: "Teacher Resources",
  },
  {
    href: "/resources/press",
    label: "Press & Publications",
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

        <div className="px-8 md:px-24 md:pt-6 md:pb-8 xl:px-48">
          <h1 className="text-3xl md:text-6xl text-black font-semibold md:ml-[-4px]">
            Resources
          </h1>

          <div className="mt-2 md:mt-4 mb-4 lg:w-7/12 xl:w-6/12">
            We produce free downloadable school resources and research for many
            of our projects - you can find them below. Please contact us if
            you'd like any advice on using the school resources.
          </div>

          <Media greaterThanOrEqual="md">
            <div className="flex my-8">
              {LINKS.map(({ href, label }, i) => (
                <Link key={i} href={href}>
                  <a
                    className={`btn btn-transparent-outlined ${
                      router.pathname === href ? "active" : ""
                    } mr-8 font-bold text-l w-60`}
                  >
                    {label}
                  </a>
                </Link>
              ))}
            </div>
          </Media>

          <div>{children}</div>

          <div className="w-full flex justify-end mt-8 ">
            <span
              role="button"
              className="text-xl font-semibold flex items-center"
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
