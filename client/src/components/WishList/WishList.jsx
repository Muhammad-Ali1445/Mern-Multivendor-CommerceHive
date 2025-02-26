import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

const WishList = ({ setOpenWishList }) => {
  const CartData = [
    {
      name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
      description: "test",
      price: 1099,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
      description: "test",
      price: 1099,
    },
    {
      name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
      description: "test",
      price: 1099,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishList(false)}
            />
          </div>
          {/* items Length */}

          <div className={`${styles.normalFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">3 Items</h5>
          </div>

          {/* cart single item */}
          <br />

          <div className="w-full border-t">
            {CartData &&
              CartData.map((cartProduct, index) => (
                <CartSingle key={index} cartProduct={cartProduct} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ cartProduct }) => {
  const [value] = useState(1);
  const totalPrice = cartProduct.price * value;
  return (
    <div className="border-b p-4 ">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" />
        <img
          src="https://5.imimg.com/data5/AP/HE/MY-13283794/casual-shirt.jpg"
          alt=""
          className="h-[80px] w-[80px] ml-2"
        />

        <div className="pl[-5px]">
          <h1>{cartProduct.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            USD ${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to Cart"
          />
        </div>
      </div>
    </div>
  );
};
export default WishList;
