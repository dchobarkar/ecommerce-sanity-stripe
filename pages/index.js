import React from "react";

import { client } from "../sanity/lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ productsData, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Beset seling Products.</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {productsData?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const productsData = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { productsData, bannerData },
  };
};

export default Home;
