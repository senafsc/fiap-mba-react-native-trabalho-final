import api from "../Common/api";

const getProductList = (data: any, token: string) => api.get("storeProducts/?page=1&perPage=5&orderBy=price&orderDirection=asc", {
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
