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
  TextTitleName,
  StyledButton,
  LoadingContainer
} from "./HomeStyles";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import IProduct from "../../Interfaces/IProduct";

type iProps = {
  getNewDataPage: (pageIndex: number) => void
  testeConnection: IProduct[];
  currentPage: number;
  isLoading: boolean;
  goToDetail: (item: IProduct) => void;
};

const HomeView = ({
  currentPage,
  testeConnection,
  getNewDataPage,
  isLoading,
  goToDetail,
}: iProps) => {
  

  const RenderItem = ({ item }: { item: IProduct }) => {
    
    return (
      <>
        <ContainerItem
          onPress={() => goToDetail(item)}
          testID={"button" + item.id}
        >
          <>
            <TextsView>
              {/* <View>
                <StyledImage source={{ uri: item.image }} />
              </View> */}
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
                  <TextDetail>{item.favorite ? 'Sim' : 'Não'}</TextDetail>
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
        <View style={{ flexDirection: 'row' }}>
          <StyledButton title="Anterior" onPress={() => getNewDataPage(currentPage -1)} />
          <StyledButton title="Próxima" onPress={() => getNewDataPage(currentPage + 1)} />
        </View>
      </>
    </MainSafeAreaView>
  );
};

export default HomeView;
