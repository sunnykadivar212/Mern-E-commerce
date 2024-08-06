const { default: SummeryApi } = require("../common/ApiURI");

const getCategoryWiseProduct = async (category) => {
  const response = await fetch(SummeryApi.categoryWiseProduct.url, {
    method: SummeryApi.categoryWiseProduct.method,
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      category: category
    })
  });

  const dataResponse = await response.json();

  return dataResponse;
};

export default getCategoryWiseProduct;
