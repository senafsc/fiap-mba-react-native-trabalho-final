import React, { useState } from "react";
import SignInView from "./SignInView";

import useAPI from "../../Services/APIs/Common/useAPI";
import { getSignIn, IParamGetSignIn } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";

import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { setUser } from "../../Store/Login/LoginSlice";
import { ToastAndroid } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import IUCreateUser from "../../Interfaces/IUCreateUser";

type iProps = StackScreenProps<RootStackParamList, "SignIn">

const SignInController = ({ navigation, route }: iProps) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  const getSignInAPI = useAPI(getSignIn);

  // Retorna para tela anterior;
  const goToBack = () => {
    navigation.goBack();
  }

  const showToast = (text: string) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const setNewUser = (userName: string, phone: string, email: string, password: string) => {
    console.log('LOG => TESTE: ', { userName, phone, email, password });
    
    let emptyAttr = '';
    
    if (!userName) emptyAttr = 'Nome';
    if (!phone) emptyAttr = (emptyAttr) ? emptyAttr + ", Telefone" : 'Telefone';
    if (!email) emptyAttr = (emptyAttr) ? emptyAttr + ", Email" : 'Email';
    if (!password) emptyAttr = (emptyAttr) ? emptyAttr + ", Senha" : 'Senha';

    if (!userName || !phone || !email || !password) {
      const numberOfElements = emptyAttr.split(',');
      const text = (Array.isArray(numberOfElements) && numberOfElements.length > 0) ? 'Os campos ' + emptyAttr + " estão em branco" : "O campo " + emptyAttr + " está em branco";
      showToast(text);
    } else {
      const lowerEmail = email.toLowerCase();
      let info: IParamGetSignIn = {
        name: userName,
        phone: phone,
        email: lowerEmail,
        password: password,
      };
      setIsLoadingAuth(true);

      getSignInAPI
        .requestPromise(info)
        .then((createUser: IUCreateUser) => {
          if (!createUser.userId) {
            const messageError = 'Usuário não cadastrado';
            console.log(`Log => ${messageError}`);
            showToast(messageError);
            setIsLoadingAuth(false);
          } else {
            console.log("LOG => createUser: ", { createUser });
            setIsLoadingAuth(false);
            goToBack();
          }
        })
        .catch((error: any) => {
          console.log("Retornou erro");
          console.log(error);
          showToast('Falha ao criar usuário!')
          setIsLoadingAuth(false);
        });
    }
  };

  const submitForm = (userName: string, phone: string, email: string, password: string) => {
    setNewUser(userName, phone, email, password);
  };

  return <SignInView submitForm={submitForm} goToBack={goToBack} isLoadingAuth={isLoadingAuth} />;
};

export default SignInController;
