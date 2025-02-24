import React, { useState } from "react";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(1);

  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleMessageSubmit = () => {
    console.log("Message");
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%]"
                />

                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>

                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="flex">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px] ">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title={"Remove from whishlist"}
                      />
                    ) : (
                      <AiOutlineHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title={"Add to whishlist"}
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                >
                  <span className="text-white flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center pt-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                    alt=""
                  />
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pt-1 pb-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings})Ratings
                    </h5>
                  </div>

                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-18px px-1 leading-5 font-600 cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className="text-[#000] text-18px px-1 leading-5 font-600 cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        <div className="relative">
          <h5
            className="text-[#000] text-18px px-1 leading-5 font-600 cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
            ut repudiandae soluta eaque delectus, quis laboriosam, et vel
            possimus harum a nihil perspiciatis. In odio officiis modi quos,
            quam soluta! Voluptas rem molestiae magnam cupiditate quod omnis
            distinctio aliquam sapiente enim cum quaerat, reprehenderit
            blanditiis quas labore, repellendus in suscipit maiores ducimus esse
            culpa? Sapiente nam alias laboriosam ipsum incidunt. Quidem voluptas
            minus Minima exercitationem nam perspiciatis.
          </p>

          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
            ut repudiandae soluta eaque delectus, quis laboriosam, et vel
            possimus harum a nihil perspiciatis. In odio officiis modi quos,
            quam soluta! Voluptas rem molestiae magnam cupiditate quod omnis
            distinctio aliquam sapiente enim cum quaerat, reprehenderit
            blanditiis quas labore, repellendus in suscipit maiores ducimus esse
            culpa? Sapiente nam alias laboriosam ipsum incidunt. Quidem voluptas
            minus Minima exercitationem nam perspiciatis.
          </p>

          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
            ut repudiandae soluta eaque delectus, quis laboriosam, et vel
            possimus harum a nihil perspiciatis. In odio officiis modi quos,
            quam soluta! Voluptas rem molestiae magnam cupiditate quod omnis
            distinctio aliquam sapiente enim cum quaerat, reprehenderit
            blanditiis quas labore, repellendus in suscipit maiores ducimus esse
            culpa? Sapiente nam alias laboriosam ipsum incidunt. Quidem voluptas
            minus Minima exercitationem nam perspiciatis.
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex items-center justify-center">
          <p>No reviews Yet</p>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                className="w-[50px] h-[50px] rounded-full mr-2"
                alt=""
              />
              <div className="pr-8">
                <h3 className={`${styles.shop_name} pt-1 pb-1`}>
                  {data.shop.name}
                </h3>
                <h5 className="pb-2 text-[15px]">
                  ({data.shop.ratings})Ratings
                </h5>
              </div>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est
              eaque velit natus ducimus adipisci id porro quaerat doloribus,
              exercitationem quos in, odio quam eius provident, cumque vel autem
              officiis fuga dio quam eius provident dio quam eius.
            </p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex items-end flex-col">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">14 March,2023</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products: <span className="font-[500]">1,223</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total reviews: <span className="font-[500]">486</span>
              </h5>
              <Link to="/">
                <div className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}>
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
