import React from "react";
import Header from "../components/Layout/Header.jsx";
import Footer from "../components/Layout/Footer.jsx";
import ProductDetails from "../components/Products/ProductDetails.jsx";
import SuggestedProduct from "../components/Products/SuggestedProduct.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../static/data.js";

const ProductDetailPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const ProductName = name.replace(/-/g, " ");

  useEffect(() => {
    const data = productData.find((product) => product.name === ProductName);
    setData(data);
  }, []);
  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
