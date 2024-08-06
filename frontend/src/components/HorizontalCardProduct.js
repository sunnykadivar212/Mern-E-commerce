import React, { useContext, useEffect, useRef, useState } from "react";
import getCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);

  const scrollElement = useRef();
  const {fetchUserAddToCart} = useContext(Context);

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await getCategoryWiseProduct(category);
    setLoading(false);

    setData(categoryProduct?.data);
  };

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white rounded-full shadow-md p-2 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white rounded-full shadow-md p-2 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
        {loading
          ? loadingList?.map((product, index) => {
              return (
                <div className="flex h-36 bg-white w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 bg-slate-200 animate-pulse rounded-full"></h2>
                    <p className="text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-3">
                      <p className="text-red-500 font-mediu p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="px-3 py-0.5 rounded-full text-white text-sm w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data?.map((product, index) => {
              return (
                <Link
                  to={"product/" + product._id}
                  className="flex h-36 bg-white w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product?.productImage[0]}
                      className="object-scale-down h-full hover:scale-110 transition-all"
                    />
                  </div>
                  <div className="p-4 grid">
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
                      className="bg-red-500 hover:bg-red-700 px-3 py-0.5 rounded-full text-white text-sm"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
