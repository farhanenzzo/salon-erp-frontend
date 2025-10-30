import dynamic from "next/dynamic";
import React from "react";

const StocksTab = dynamic(
  () => import("../../../components/productsTab/ProductsTab"),
  {
    ssr: false,
  }
);

const ProductsPage = () => {
  return <StocksTab />;
};

export default ProductsPage;
