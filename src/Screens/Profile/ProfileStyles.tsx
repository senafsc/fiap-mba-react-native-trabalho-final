import styled from "styled-components/native";
import { Button } from "react-native-elements";
import Colors from "../../Styles/Colors";

export const MainSafeAreaView = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

export const TopScreen = styled.View`
  flex: 2;
  align-content: center;
  justify-content: center;
`;

export const BottomScreen = styled.View`
  flex: 10;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Title = styled.Text`
  margin: 20px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;

export const ProfileBox = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  margin: 35px;
  border-radius: 15px;
  border-width: 1px;
  padding: 20px;
`;

export const LabelProfile = styled.Text`
  font-size: 15px;
  margin-left: 5px;
  color: #333;
`;

export const LabelProfileInfo = styled.Text`
  font-size: 18px;
  margin-left: 5px;
  margin-bottom: 20px
  
`;

export const BottomButton = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: center;
`;

export const StyledButton = styled(Button).attrs({
  buttonStyle: {
    backgroundColor: `${Colors.blueviolet}`,
    borderRadius: 10,
  },
  containerStyle: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
})``;

export const NewAccountLabel = styled.Text`
  font-size: 15px;
  margin-left: 5px;
  color: #333;
`

export const TouchableButton = styled.TouchableHighlight`
  flex: 1
`