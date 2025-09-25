import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/global";
import parse from "html-react-parser";
import { formatPriceBrowser } from "@/utils/price";

interface ShopProductCardProps {
  product: Product;
  hasPriorityImage: boolean;
  includeLinkToShop?: boolean;
  bgColor: string;
}

export const ShopProductCard: React.FC<ShopProductCardProps> = ({
  product,
  hasPriorityImage,
  includeLinkToShop = false,
  bgColor,
}) => (
  <div
    className={`flex flex-col md:flex-row pt-6 p-8 md:mb-8 md:px-16 md:py-16 md:h-[540px] lg:h-[740px] ${bgColor} 2xl:w-[1420px] xl:mx-auto`}
    key={product._id}
  >
    <div className="relative  w-full md:h-full aspect-square md:aspect-auto md:w-5/12 xl:w-7/12">
      <Image
        priority={hasPriorityImage}
        className="w-full h-40"
        objectFit="contain"
        layout="fill"
        alt={product.name}
        src={product.image}
      />
    </div>

    <div className="flex flex-col justify-center mt-8 md:mt-0 md:h-full w-full md:pl-8 lg:pl-16 lg:pr-8 md:w-7/12">
      <h1 className="text-xl md:text-2xl text-black font-bold mb-2 lg:mb-8">
        {product.name}
      </h1>
      <p className="text-black mb-4 lg:mb-8">{parse(product.description)}</p>
      <span className="text-black text-2xl font-bold mb-8 md:mb-4 lg:mb-8">
        {formatPriceBrowser(product.price)}
      </span>
      <div className="flex flex-col md:flex-row gap-x-6 gap-y-4">
        <a
          href={product.etsyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-transparent-outlined w-full md:w-40 font-medium text-l"
        >
          Buy
        </a>
        {includeLinkToShop ? (
          <Link href="/shop">
            <a className="btn btn-transparent-outlined w-full md:w-40 font-medium text-l">
              Go to Shop
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  </div>
);
