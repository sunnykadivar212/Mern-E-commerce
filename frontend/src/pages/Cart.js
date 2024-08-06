import React, { useContext, useEffect, useState } from "react";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import SummeryApi from "../common/ApiURI";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const handleLoading = async () => {
    await fetchData();
  };

  const fetchData = async () => {
    const response = await fetch(SummeryApi.addToCartProductView.url, {
      method: SummeryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    });

    const dataResponse = await response.json();

    if (dataResponse.success) {
      setData(dataResponse.data);
    }
  };

  const increaseQty = async (id, qty) => {
    const resaponse = await fetch(SummeryApi.updateCartProduct.url, {
      method: SummeryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1
      })
    });

    const responseData = await resaponse.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const resaponse = await fetch(SummeryApi.updateCartProduct.url, {
        method: SummeryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1
        })
      });

      const responseData = await resaponse.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const resaponse = await fetch(SummeryApi.deleteCartProduct.url, {
      method: SummeryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        _id: id
      })
    });

    const responseData = await resaponse.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue?.quantity,
    0
  );

  const totalPrice = data.reduce(
    (prev, curr) => prev + curr?.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    const stripePromise = await loadStripe(
      process.env.REACT_APP_STRIPE_PUBLIC_KEY
    );

    const response = await fetch(SummeryApi.payment.url, {
      method: SummeryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ cartItems: data })
    });

    const responseData = await response.json();

    console.log("reponseData==>", responseData);
    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData?.id });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 justify-between p-4">
        {/**View Product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    key={el + "AddToCart" + index}
                    className="w-full bg-slate-200 h-32 my-2 rounded border border-slate-300 animate-pulse"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "AddToCart"}
                    className="grid grid-cols-[120px,1fr] w-full bg-white h-32 my-2 rounded border border-slate-300"
                  >
                    <div className="h-32 w-32 bg-slate-200 p-2">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      <div
                        className="absolute right-0 p-2 rounded-full mx-2 text-red-600 bg-red-100 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-500 font-medium text-lg">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-500 h-6 w-6 text-red-500 hover:bg-red-500 hover:text-white flex justify-center items-center rounded"
                          onClick={() =>
                            decreaseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-500 h-6 w-6 text-red-500 hover:bg-red-500 hover:text-white flex justify-center items-center rounded"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/**Summery  */}
        {data[0] && (
          <div className="w-full max-w-sm mt-5 lg:mt-0">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-red-500 px-4 py-1">Summary </h2>
                <div className="flex items-center justify-between px-4 text-lg font-medium text-slate-600 gap-2">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex items-center justify-between px-4 text-lg font-medium text-slate-600 gap-2">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <button
                  className="bg-blue-600 text-white w-full p-2"
                  onClick={handlePayment}
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
