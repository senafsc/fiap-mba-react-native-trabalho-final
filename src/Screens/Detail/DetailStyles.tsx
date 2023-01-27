import styled from "styled-components/native";
import { Image } from "react-native-elements";
import Colors from "../../Styles/Colors";

export const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  margin: 24px;
`;

export const TextName = styled.Text`
  margin-vertical: 36px;
  font-size: 25px;
`;

export const TextTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.NeutralDark};
`;

export const TextDetail = styled.Text`
  font-size: 14px;
  color: ${Colors.NeutralDark};
`;

export const TextNoInfo = styled.Text`
  margin-top: 150px;
  font-size: 30px;
  color: ${Colors.NeutralDark};
  text-align: center;
`;

export const TextButton = styled.Text`
  margin-top: 150px;
  font-size: 24px;
  color: ${Colors.blueviolet};
  text-align: center;
`;

export const StyledImage = styled(Image).attrs({
  containerStyle: {
    width: "100%",
    height: 190,
  },
})``;
