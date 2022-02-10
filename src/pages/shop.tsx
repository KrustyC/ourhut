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

      <div className="bg-white pb-8">
        <Navbar
          config={{
            burgerColor: "bg-primary",
            textColor: "fill-black",
            logoColor: "fill-primary",
          }}
        />

        <div className="px-32">
          <h1 className="text-6xl text-black font-bold my-8">Our Hut Shop</h1>

          <div className="flex flex-col">
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
