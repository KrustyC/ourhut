import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Product } from "@/types/global";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import parse from "html-react-parser";

interface ShopPageProps {
  products: Product[];
}

const ShopPage: NextPage<ShopPageProps> = ({ products }) => {
  console.log("RPG", products);
  return (
    <div>
      <Head>
        <title>Shop | Our Hut</title>
        <meta name="description" content="Our Shop" />
      </Head>

      <div className="bg-white pb-8">
        <Navbar
          config={{
            burgerColor: "bg-primary",
            textColor: "text-black",
            logoColor: "bg-primary",
          }}
        />

        <div className="px-32">
          <h1 className="text-6xl text-black font-bold my-8">Our Hut Shop</h1>

          <div className="flex flex-col">
            {products.map((product, i) => (
              <div
                className={`flex mb-8 px-16 py-16 h-[740px] bg-${
                  i % 2 === 0 ? "gray-100" : "white"
                }`}
                key={product._id}
              >
                <div className="relative h-full w-7/12">
                  <Image
                    priority={i === 0}
                    className="w-full h-40"
                    objectFit="contain"
                    layout="fill"
                    alt={product.name}
                    src={product.image}
                  />
                </div>
                <div className="flex flex-col justify-center h-full w-1/2 pl-16 pr-8 w-5/12">
                  <h1 className="text-2xl text-black font-bold mb-8">
                    {product.name}
                  </h1>
                  <p className="text-black mb-8">
                    {parse(product.description)}
                  </p>
                  <span className="text-black text-2xl font-bold mb-8">
                    £9.99
                  </span>
                  <a href={product.etsyLink} className="btn btn-transparent-outlined w-40 font-bold">
                    Buy on Etsy
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.baseUrl}/.netlify/functions/products`);

  const { products } = await res.json();

  return {
    props: { products },
  };
}

export default ShopPage;
