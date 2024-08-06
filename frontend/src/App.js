import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import SummeryApi from "./common/ApiURI";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount]=useState(0);

  const fetchUserDetails = async () => {
    const dataResponce = await fetch(SummeryApi.current_user.url, {
      method: SummeryApi.current_user.method,
      credentials: "include"
    });

    const dataApi = await dataResponce.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart =async()=>{
    const dataResponce = await fetch(SummeryApi.addToCartProductCount.url, {
      method: SummeryApi.addToCartProductCount.method,
      credentials: "include"
    });

    const dataApi = await dataResponce.json();

    setCartProductCount(dataApi?.data?.count);

  }
  useEffect(() => {
    /*user Details */
    fetchUserDetails();

    fetchUserAddToCart()
  });
  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user details fetch
          cartProductCount, // current user addtocart product count
          fetchUserAddToCart
        }}
      >
        <ToastContainer position="top-center"/>
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
