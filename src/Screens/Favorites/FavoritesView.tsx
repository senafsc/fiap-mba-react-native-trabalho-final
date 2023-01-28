import React from "react";
import { View, FlatList } from "react-native";

import Colors from "../../Styles/Colors";

import {
  ContainerItem,
  MainSafeAreaView,
  StyledActivityIndicator,
  TextNameStyle,
  TextsView,
  TextTitle,
  TextDetail,
  Separator,
  TextTitleName,
  LoadingContainer
} from "./FavoritesStyles";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import IProduct from "../../Interfaces/IProduct";

type iProps = {
  testeConnection: IProduct;
  isLoading: boolean;
  goToDetail: (item: IProduct) => void;
};

const FavoritesView = ({
  testeConnection,
  isLoading,
  goToDetail,
}: iProps) => {
  

  const RenderItem = ({ item }: { item: IProduct }) => {
    
    return (
      <>
        <ContainerItem
          onPress={() => goToDetail(item)}
          testID={"button" + item._id}
        >
          <>
            <TextsView>
              <View style={{ maxWidth: '90%', justifyContent: 'center' }}>
                <TextNameStyle>
                  <TextTitleName>Nome:</TextTitleName>
                  <TextTitle>{item.name}</TextTitle>
                </TextNameStyle>

                <TextNameStyle>
                  <TextDetail>Preço:</TextDetail>
                  <TextDetail>{item.price}</TextDetail>
                </TextNameStyle>

                <TextNameStyle>
                  <TextDetail>Favorito:</TextDetail>
                  <TextDetail>Sim</TextDetail>
                </TextNameStyle>
              </View>
            </TextsView>
            <Separator />
          </>
        </ContainerItem>
      </>
    );
  };

  if (isLoading) {
    return (
      <MainSafeAreaView>
        <LoadingContainer>
          <StyledActivityIndicator
            size="large"
            color={Colors.PrimaryDark}
            testID="activityLoading"
          />
        </LoadingContainer>
      </MainSafeAreaView>
    );
  }

  return (
    <MainSafeAreaView>
      <DrawerMenu />
      <>
        <FlatList
          data={testeConnection}
          renderItem={({ item }: { item: IProduct }) => <RenderItem item={item} />}
          keyExtractor={(item: IProduct) => item._id}
          testID="flatListHome"
        />
      </>
    </MainSafeAreaView>
  );
};

export default FavoritesView;
