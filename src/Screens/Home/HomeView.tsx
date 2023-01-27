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
import IProduct from "../../Interfaces/IProduct";

type iProps = {
  dataConnection: IPerson[];
  testeConnection: IProduct[];
  isLoading: boolean;
  goToDetail: (item: IProduct) => void;
};

const HomeView = ({
  testeConnection,
  dataConnection,
  isLoading,
  goToDetail,
}: iProps) => {
  

  const RenderItem = ({ item }: { item: IProduct }) => {
    
    return (
      <ContainerItem
        onPress={() => goToDetail(item)}
        testID={"button" + item.id}
      >
        <>
          <TextsView>
            {/* <View>
              <StyledImage source={{ uri: item.image }} />
            </View> */}
            <View>
              <TextNameStyle>
                <TextTitle>
                  {item.name}
                </TextTitle>
              </TextNameStyle>
              <TextNameStyle>
                <TextDetail>
                  {item.price}
                </TextDetail>
              </TextNameStyle>
              <TextNameStyle>
                <TextDetail>{item.favorite}</TextDetail>
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
        data={testeConnection}
        renderItem={({ item }: { item: IProduct }) => <RenderItem item={item} />}
        keyExtractor={(item: IProduct) => item.id}
        testID="flatListHome"
      />
    </MainSafeAreaView>
  );
};

export default HomeView;
