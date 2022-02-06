import Image from "next/image";
import { Product } from "@/types/global";
import parse from "html-react-parser";
import { formatPriceBrowser } from "@/utils/price";

interface ShopProductCardProps {
  product: Product;
  hasPriorityImage: boolean;
  bgColor: string;
}

export const ShopProductCard: React.FC<ShopProductCardProps> = ({
  product,
  hasPriorityImage,
  bgColor,
}) => (
  <div
    className={`flex mb-8 px-16 py-16 h-[740px] ${bgColor}`}
    key={product._id}
  >
    <div className="relative h-full w-7/12">
      <Image
        priority={hasPriorityImage}
        className="w-full h-40"
        objectFit="contain"
        layout="fill"
        alt={product.name}
        src={product.image}
      />
    </div>
    <div className="flex flex-col justify-center h-full w-1/2 pl-16 pr-8 w-5/12">
      <h1 className="text-2xl text-black font-bold mb-8">{product.name}</h1>
      <p className="text-black mb-8">{parse(product.description)}</p>
      <span className="text-black text-2xl font-bold mb-8">
        {formatPriceBrowser(product.price)}
      </span>
      <a
        href={product.etsyLink}
        className="btn btn-transparent-outlined w-40 font-bold"
      >
        Buy on Etsy
      </a>
    </div>
  </div>
);
