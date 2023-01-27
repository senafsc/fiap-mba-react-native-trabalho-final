import React from "react";

import { Input } from "react-native-elements";
import { ActivityIndicator } from "react-native-paper";
import {
  BottomButton,
  BottomScreen,
  FrontImageBackground,
  LabelLogin,
  LoginBox,
  LogoDiv,
  MainContainer,
  StyledButton,
  StyledImageBackground,
  TopScreen,
} from "./LoginStyles";

type IProps = {
  isLoadingAuth: boolean;
  submitForm: (email: string, password: string) => void;
};

const LoginView = ({ submitForm, isLoadingAuth }: IProps) => {
  const [email, onChangeText] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const showState = () => {
    console.log('LOG => STATE: ', { email: email });
  }
  let infoButton = <StyledButton title="Login" onPress={() => {
    submitForm(email, password);
  }} />;
  if (isLoadingAuth) {
    infoButton = <ActivityIndicator size="large" color="red" />;
  }
  return (
    <MainContainer>
      <StyledImageBackground
        source={{
          uri: "https://previews.123rf.com/images/chagin/chagin1501/chagin150100001/35151812-business-people-working-together.jpg",
        }}
        resizeMode="cover"
      >
        <FrontImageBackground>
          <TopScreen>
            <LogoDiv>RH App</LogoDiv>
          </TopScreen>
          <BottomScreen>
            <LoginBox>
              <LabelLogin>Login</LabelLogin>
              <Input
                placeholder="informe o seu email"
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  color: "red",
                }}
                onChangeText={onChangeText}
                value={email}
                placeholderTextColor={"#999"}
                autoCompleteType="email"
              />
              <LabelLogin>Senha</LabelLogin>
              <Input
                placeholder="Informe a sua senha"
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  color: "red",
                }}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
                placeholderTextColor={"#999"}
                autoCompleteType="password"
              />
              <BottomButton>{infoButton}</BottomButton>
            </LoginBox>
          </BottomScreen>
        </FrontImageBackground>
      </StyledImageBackground>
    </MainContainer>
  );
};

export default LoginView;
