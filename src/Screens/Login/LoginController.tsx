import React, { useState } from "react";
import LoginView from "./LoginView";

import useAPI from "../../Services/APIs/Common/useAPI";
import { getLogin, IParamGetLogin } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";

import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { setUser } from "../../Store/Login/LoginSlice";
import { ToastAndroid } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";

type iProps = StackScreenProps<RootStackParamList, "SignIn">

const LoginController = ({ route, navigation }: iProps) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const getLoginAPI = useAPI(getLogin);

  const dispatch = useAppDispatch();

  // Redireciona para tela de SignIn
  const goToSignInScreen = () => {
    navigation.navigate("SignIn");
  }

  const showToast = (text: string) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const makeLogin = (userName: string, password: string) => {
    console.log('LOG => TESTE: ', { userName, password });
    
    if (!userName || !password) {
      showToast('Email ou Senha não informado');
    } else {
      const lowerUsername = userName.toLowerCase();
      let info: IParamGetLogin = {
        email: lowerUsername,
        password: password,
      };
      setIsLoadingAuth(true);

      getLoginAPI
        .requestPromise(info)
        .then((user: IUserInfo) => {
          if (!user.token) {
            const messageError = 'Usuário não encontrado';
            console.log(`Log => ${messageError}`);
            showToast(messageError);
            setIsLoadingAuth(false);
          } else {
            console.log("LOG => user: ", { user });
            console.log("LOG => user_token: ", { user_token: user.token });
            dispatch(setUser({ user }));
            setIsLoadingAuth(false);
          }
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

  return <LoginView submitForm={submitForm} goToSignInScreen={goToSignInScreen} isLoadingAuth={isLoadingAuth} />;
};

export default LoginController;
