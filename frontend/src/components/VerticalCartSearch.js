import React, { useContext } from "react";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import scrollTop from "../helpers/scrollTop";
import Context from "../context";
import addToCart from "../helpers/addToCart";

const VerticalCartSearch = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const {fetchUserAddToCart} = useContext(Context);

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between gap-4 md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList?.map((product, index) => {
            return (
              <div className="bg-white w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow">
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="text-slate-500 p-1 py-2 animate-pulse rounded-full bg-slate-200"></p>
                  <div className="flex gap-3">
                    <p className="text-red-500 font-medium w-full p-1 py-2 animate-pulse rounded-full bg-slate-200"></p>
                    <p className="text-slate-500 line-through w-full p-1 py-2 animate-pulse rounded-full bg-slate-200"></p>
                  </div>
                  <button className="px-3 py-2 rounded-full text-white text-sm w-full animate-pulse bg-slate-200"></button>
                </div>
              </div>
            );
          })
        : data?.map((product, index) => {
            return (
              <Link
                to={"/product/" + product._id}
                className="bg-white w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] rounded-sm shadow"
                onClick={scrollTop}
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center ">
                  <img
                    src={product?.productImage[0]}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="text-slate-500">{product?.category}</p>
                  <div className="flex gap-3">
                    <p className="text-red-500 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="bg-red-500 hover:bg-red-700 px-3 py-2 rounded-full text-white text-sm"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default VerticalCartSearch;
