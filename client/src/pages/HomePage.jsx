import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Home/Hero/Hero.jsx";
import Categories from "../components/Home/Categories/Categories.jsx";
import BestDeals from "../components/Home/BestDeals/BestDeals.jsx";
import Events from "../components/Home/Events/Events.jsx";
import FeaturedProduct from "../components/Home/FeaturedProduct/FeaturedProduct.jsx";
import Sponsered from "../components/Home/Sponsered.jsx";
import Footer from "../components/Layout/Footer.jsx";
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsered />
      <Footer />
    </div>
  );
};

export default HomePage;
