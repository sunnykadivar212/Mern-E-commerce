import React from "react";
import SuccessImage from "../assest/success.gif";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
      <img
        src={SuccessImage}
        width={200}
        height={200}
        className="object-scale-down mix-blend-multiply"
      />
      <p className="text-green-500 font-bold text-xl">Payment Successfully</p>
      <Link
        to={"/order"}
        className="p-2 mt-5 border-2 px-3 font-semibold border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white"
      >
        See Order
      </Link>
    </div>
  );
};

export default Success;
