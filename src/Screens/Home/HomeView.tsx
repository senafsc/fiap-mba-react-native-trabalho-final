import React from "react";
import { View, FlatList } from "react-native";

import Colors from "../../Styles/Colors";
import IPerson from "../../Interfaces/IPerson";

import {
  ContainerItem,
  MainSafeAreaView,
  StyledActivityIndicator,
  TextNameStyle,
  TextsView,
  TextTitle,
  TextDetail,
  Separator,
  StyledImage,
} from "./HomeStyles";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";

type iProps = {
  dataConnection: IPerson[];
  isLoading: boolean;
  goToDetail: (item: IPerson) => void;
};

const HomeView = ({
  dataConnection,
  isLoading,
  goToDetail,
}: iProps) => {
  

  const RenderItem = ({ item }: { item: IPerson }) => {
    
    return (
      <ContainerItem
        onPress={() => goToDetail(item)}
        testID={"button" + item.CPF.toString()}
      >
        <>
          <TextsView>
            <View>
              <StyledImage source={{ uri: item.image }} />
            </View>
            <View>
              <TextNameStyle>
                <TextTitle>
                  {item.firstName} {item.lastName}
                </TextTitle>
              </TextNameStyle>
              <TextNameStyle>
                <TextDetail>
                  {item.address} - {item.state} - {item.zipCode}
                </TextDetail>
              </TextNameStyle>
              <TextNameStyle>
                <TextDetail>{item.jobTitle}</TextDetail>
              </TextNameStyle>
            </View>
          </TextsView>
          <Separator />
        </>
      </ContainerItem>
    );
  };


  let loadingBox = null;
  if (isLoading) {
    loadingBox = (
      <StyledActivityIndicator
        size="large"
        color={Colors.PrimaryDark}
        testID="activityLoading"
      />
    );
  }

  return (
    <MainSafeAreaView>
      <DrawerMenu />
      {loadingBox}
      <FlatList
        data={dataConnection}
        renderItem={({ item }: { item: IPerson }) => <RenderItem item={item} />}
        keyExtractor={(item: IPerson) => item.CPF.toString()}
        testID="flatListHome"
      />
    </MainSafeAreaView>
  );
};

export default HomeView;
