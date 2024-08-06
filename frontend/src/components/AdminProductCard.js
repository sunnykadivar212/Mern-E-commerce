import React, { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import SummeryApi from "../common/ApiURI";
import { toast } from "react-toastify";
import axios from "axios";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  useEffect(() => {}, [data, fetchdata]);

  const deleteCartProduct = async () => {
    try {
      const response = await fetch(SummeryApi.deleteProduct.url, {
        method: SummeryApi.deleteProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          _id: data?._id
        })
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        fetchdata(); // Fetch data again after successful delete
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="bg-white p-4 rounded">
      <div className="grid items-center justify-center w-40">
        <div className="flex items-center justify-center py-2 w-36 h-36">
          <img
            src={data?.productImage[0]}
            className="object-scale-down h-full hover:scale-110 transition-all"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data?.productName}</h1>

        <div>
          <p className="font-semibold">
            {displayINRCurrency(data?.sellingPrice)}
          </p>

          <div className="flex justify-between">
            <div
              className="w-fit p-2 bg-blue-200 rounded-full hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdOutlineModeEdit />
            </div>
            <div
              className="w-fit p-2 bg-red-200 rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
              onClick={deleteCartProduct}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
