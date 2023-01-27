import styled from "styled-components/native";
import { Button } from "react-native-elements";
import Colors from "../../Styles/Colors";

export const MainSafeAreaView = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  height: 100%
  margin-top: 50%
`

export const StyledActivityIndicator = styled.ActivityIndicator`
  margin-top: 30px;
`;

export const ContainerItem = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const TextsView = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 5px;
  margin-horizontal: 12px;
`;

export const TextNameStyle = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  flex: 1
`;
export const TextTitle = styled.Text`
  font-size: 14px;
`;

export const TextTitleName = styled.Text`
  font-size: 14px;
  margin: 2px;
`;

export const TextDetail = styled.Text`
  font-size: 14px;
  margin: 2px;
`;

export const Separator = styled.Text`
  flex: 1;
  height: 2px;
  background-color: ${Colors.NeutralMedium};
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const StyledButton = styled(Button).attrs({
  buttonStyle: {
    backgroundColor: `${Colors.blueviolet}`,
    borderRadius: 10,
  },
  containerStyle: {
    padding: 8,
    height: "100%",
    flex: 1,
  },
})``;
