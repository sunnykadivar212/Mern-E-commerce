import React from "react";
import CancelImage from "../assest/cancel.webp";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
      <img
        src={CancelImage}
        width={200}
        height={200}
        className="object-scale-down mix-blend-multiply"
      />
      <p className="text-red-500 font-bold text-xl">Payment Cancel</p>
      <Link
        to={"/cart"}
        className="p-2 mt-5 border-2 px-3 font-semibold border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white"
      >
        Go To Cart
      </Link>
    </div>
  );
};

export default Cancel;
