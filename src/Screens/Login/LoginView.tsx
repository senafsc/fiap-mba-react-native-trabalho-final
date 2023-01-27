import React from "react";

import { Input } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import {
  BottomButton,
  BottomScreen,
  LabelLogin,
  LoginBox,
  Title,
  MainSafeAreaView,
  StyledButton,
  TopScreen,
  NewAccountLabel,
} from "./LoginStyles";

import { TouchableOpacity } from "react-native";

import Colors from "../../Styles/Colors";

type IProps = {
  isLoadingAuth: boolean;
  submitForm: (email: string, password: string) => void;
  goToSignInScreen: () => void;
};

const LoginView = ({ submitForm, isLoadingAuth, goToSignInScreen }: IProps) => {
  let [email, onChangeText] = React.useState('');
  let [password, onChangePassword] = React.useState('');

  const onLostFocus = () => {
    if (email) {
      onChangeText(email.toLowerCase().trim());
    }
  }

  let loginButton = <StyledButton title="Login" onPress={() => {
    submitForm(email, password);
  }} />;
  if (isLoadingAuth) {
    loginButton = <ActivityIndicator size="large" color={ Colors.blueviolet } />;
  }
  return (
    <MainSafeAreaView>
      <TopScreen>
        <Title style={{ color: Colors.brown }}>Acessar Loja:</Title>
      </TopScreen>
      <BottomScreen>
        <LoginBox style={{ borderColor: Colors.blueviolet }}>
          <LabelLogin>Login</LabelLogin>
          <Input
            placeholder="informe o seu email"
            inputStyle={{ color: Colors.blueviolet }}
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: Colors.blueviolet,
            }}
            onChangeText={onChangeText}
            onBlur={onLostFocus}
            value={email}
            placeholderTextColor={"#999"}
            autoCompleteType="email"
          />
          <LabelLogin>Senha</LabelLogin>
          <Input
            placeholder="Informe a sua senha"
            inputStyle={{ color: Colors.blueviolet }}
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              color: Colors.blueviolet,
            }}
            onChangeText={onChangePassword}
            value={password}
            secureTextEntry={true}
            placeholderTextColor={"#999"}
            autoCompleteType="password"
          />
          <BottomButton>{loginButton}</BottomButton>
          <TouchableOpacity onPress={() => {
              console.log('LOG => clicou em cadastrar novo usuário');
              goToSignInScreen();
            }
          }>
            <NewAccountLabel style={{ alignSelf: 'center', fontSize: 16, color: Colors.PrimaryDark }}>Cadastrar novo usuário</NewAccountLabel>
          </TouchableOpacity>
        </LoginBox>
      </BottomScreen>
    </MainSafeAreaView>
  );
};

export default LoginView;
