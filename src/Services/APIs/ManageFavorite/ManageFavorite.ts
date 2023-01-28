import api from "../Common/api";

const postManageFavorite = (objectID: any, token: string) => api.post("storeProducts/manageFavorite", { productID: objectID }, {
  headers: {
    'Authorization': `Bearer ${token}`
  },
});

type IParamPostManageFavorite = {
  productID: string
};

export { postManageFavorite, IParamPostManageFavorite };
