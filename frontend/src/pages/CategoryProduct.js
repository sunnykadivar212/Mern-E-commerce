import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import SummeryApi from "../common/ApiURI";
import VerticalCartSearch from "../components/VerticalCartSearch";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  const fetchData = async () => {
    const response = await fetch(SummeryApi.filterProduct.url, {
      method: SummeryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    });

    const dataResponce = await response.json();

    setData(dataResponce.data || []);
    console.log("dataResponse", dataResponce);
  };

  const handleselecteCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      };
    });
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }

        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    //formate for url change when change on the checkbox
    const urlFormate = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }

      return `category=${el}&&`;
    });
    console.log("urlFormate==>", urlFormate.join(""));
    navigate("/product-category?" + urlFormate.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/**Left Side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/**Sort By */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 pb-1 border-b border-slate-300">
              sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"asc"}
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - Low To High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"dsc"}
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - High To Low</label>
              </div>
            </form>
          </div>

          {/**Filter */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 pb-1 border-b border-slate-300">
              Filter
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleselecteCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.lable}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/**Right side */}
        <div className="px-4">
          <p className="text-lg font-medium text-slate-800 my-2">
            Search results : {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading && (
              <VerticalCartSearch data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
