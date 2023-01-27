import api from "../Common/api";

const getLogin = (data: any) =>  api.post("storeProducts/login", data);

const getSignIn = (data: any) => api.put("storeProducts/signup", data);

type IParamGetLogin = {
  email: string;
  password: string;
};

type IParamGetSignIn = {
  name: string,
  phone: string,
  email: string,
  password: string
}

export { getLogin, IParamGetLogin, getSignIn, IParamGetSignIn };
