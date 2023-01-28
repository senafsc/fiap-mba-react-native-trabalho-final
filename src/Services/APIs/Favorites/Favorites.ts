import api from "../Common/api";

const getFavorites = (token: string) => api.get("storeProducts/getFavProducts", {
  headers: {
    'Authorization': `Bearer ${token}`
  },
});

export {
  getFavorites
};
