import api from "../Common/api";

const getProductList = (data: any, token: string) => api.get("storeProducts/?page=" + data.page + "&perPage=5&orderBy=name&orderDirection=asc", {
  headers: {
    'Authorization': `Basic ${token}`
  }
});


type IParamGetProductList = {
  page: number;
  perPage: number;
  orderBy: string;
  orderDirection: string;
  // search: string;
};

export { getProductList, IParamGetProductList };
