import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard.jsx";
const BestDeals = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const sortedProductData = productData.sort(
      (a, b) => b.total_sell - a.total_sell
    );
    const firstFiveProducts = sortedProductData.slice(0, 5);
    setData(firstFiveProducts);
  }, []);
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
