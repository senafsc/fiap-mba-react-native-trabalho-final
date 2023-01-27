import React, { useState } from "react";
import LoginView from "./LoginView";

import useAPI from "../../Services/APIs/Common/useAPI";
import { getLogin, IParamGetLogin } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";

import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { setUser } from "../../Store/Login/LoginSlice";

const LoginController = () => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const getLoginAPI = useAPI(getLogin);

  const dispatch = useAppDispatch();

  const makeLogin = (userName: string, password: string) => {
    console.log("Loading School - " + userName + " - " + password);
    console.log('LOG => TESTE: ', { userName, password });
    
    if (!userName || !password) {
    } else {
      let info: IParamGetLogin = {
        email: userName,
        password: password,
      };
      setIsLoadingAuth(true);

      getLoginAPI
        .requestPromise("https://fiap-reactjs-presencial.herokuapp.com/", info)
        .then((user: IUserInfo) => {
          console.log("After Login");
          console.log(user);
          console.log(user.token);
          dispatch(setUser({ user }));
          setIsLoadingAuth(false);
        })
        .catch((error: any) => {
          console.log("Retornou erro");
          console.log(error);
          setIsLoadingAuth(false);
        });
    }
  };

  const submitForm = (email: string, password: string) => {
    makeLogin(email, password);
  };

  return <LoginView submitForm={submitForm} isLoadingAuth={isLoadingAuth} />;
};

export default LoginController;
