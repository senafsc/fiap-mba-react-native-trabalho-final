import React from "react";

import { Input } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import {
  BottomButton,
  BottomScreen,
  LabelSignIn,
  SignInBox,
  Title,
  MainSafeAreaView,
  StyledButton,
  TopScreen,
  NewAccountLabel,
} from "./SignInStyles";

import { TouchableOpacity } from "react-native";

import Colors from "../../Styles/Colors";

type IProps = {
  isLoadingAuth: boolean;
  submitForm: (userName: string, phone: string, email: string, password: string) => void;
  goToBack: () => void;
};

const SignInView = ({ submitForm, isLoadingAuth, goToBack }: IProps) => {
  let [userName, onChangeUserName] = React.useState('');
  let [phone, onChangePhone] = React.useState('');
  let [email, onChangeText] = React.useState('');
  let [password, onChangePassword] = React.useState('');

  const onLostFocus = () => {
    if (email) {
      onChangeText(email.toLowerCase().trim());
    }
  }

  let signInButton = <StyledButton title="Cadastrar Usuário" onPress={() => {
    submitForm(userName, phone, email, password);
  }} />;
  if (isLoadingAuth) {
    signInButton = <ActivityIndicator size="large" color={ Colors.blueviolet } />;
  }
  return (
    <MainSafeAreaView>
      <TopScreen>
        <Title style={{ color: Colors.brown }}>Realizar cadastro:</Title>
      </TopScreen>
      <BottomScreen>
        <SignInBox style={{ borderColor: Colors.blueviolet }}>
          <LabelSignIn>Nome</LabelSignIn>
          <Input
            placeholder="Informe o seu nome"
            inputStyle={{ color: Colors.blueviolet }}
            leftIcon={{
              type: "font-awesome",
              name: "user",
              color: Colors.blueviolet,
            }}
            onChangeText={onChangeUserName}
            value={userName}
            placeholderTextColor={"#999"}
            autoCompleteType="userName"
          />
          <LabelSignIn>Telefone</LabelSignIn>
          <Input
            placeholder="Informe seu telefone"
            inputStyle={{ color: Colors.blueviolet }}
            leftIcon={{
              type: "font-awesome",
              name: "phone",
              color: Colors.blueviolet,
            }}
            onChangeText={onChangePhone}
            value={phone}
            // secureTextEntry={false}
            keyboardType="number-pad"
            placeholderTextColor={"#999"}
            autoCompleteType="phone"
          />
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
          <LabelSignIn>Senha</LabelSignIn>
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
          <BottomButton>{signInButton}</BottomButton>
          <TouchableOpacity onPress={() => {
              goToBack();
            }
          }>
            <NewAccountLabel style={{ alignSelf: 'center', fontSize: 16, color: Colors.PrimaryDark }}>Retornar para o Login</NewAccountLabel>
          </TouchableOpacity>
        </SignInBox>
      </BottomScreen>
    </MainSafeAreaView>
  );
};

export default SignInView;
