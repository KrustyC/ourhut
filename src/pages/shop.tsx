import type { NextPage } from "next";
import Head from "next/head";
import { Product } from "@/types/global";
import { ShopProductCard } from "@/components/ShopProductCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface ShopPageProps {
  products: Product[];
}

const ShopPage: NextPage<ShopPageProps> = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Shop | Our Hut</title>
        <meta name="description" content="Our Shop" />
      </Head>

      <div className="bg-white md:pb-8">
        <Navbar
          config={{
            burgerColor: "bg-primary",
            textColor: "fill-black",
            logoColor: "fill-primary",
          }}
        />

        <div className="flex flex-col px-8 md:pt-6 md:px-24 md:pb-8 xl:px-48">
          <h1 className="text-3xl md:text-6xl text-black font-semibold md:ml-[-4px]">
            Shop
          </h1>

          <span className="font-bold mt-4 mb-8 w-full md:hidden">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            consequat libero pulvinar.
          </span>

          <div className="flex flex-col md:mt-12">
            {products.map((product, i) => (
              <ShopProductCard
                key={i}
                product={product}
                hasPriorityImage={i === 0}
                bgColor={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
              />
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
