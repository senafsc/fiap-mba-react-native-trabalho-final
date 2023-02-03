import React from "react";
import { View, FlatList } from "react-native";
import { LocationObject } from "expo-location";

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
  TopScreen,
  BottomScreen,
  LoadingOverlay
} from "./HomeStyles";
import DrawerMenu from "../../Components/DrawerMenu/DrawerMenu";
import IProduct from "../../Interfaces/IProduct";

import MyPositionView from "../MyPosition/MyPositionView";

type iProps = {
  getNewDataPage: (pageIndex: number) => void
  testeConnection: IProduct[];
  isLoading: boolean;
  goToDetail: (item: IProduct) => void;
  previewButton: boolean;
  nextButton: boolean;
  currentPage: number;
  position: LocationObject | null;
  statusPosition: number;
  startGetGeoLocation: (type: number) => void;
  cleanInfo: () => void;
};

const HomeView = ({
  testeConnection,
  getNewDataPage,
  isLoading,
  goToDetail,
  previewButton,
  nextButton,
  currentPage,
  position,
  statusPosition,
  startGetGeoLocation,
  cleanInfo,
}: iProps) => {

  const renderLoading = (isLoading: any) => {
    if (isLoading) {
      return (
        <LoadingOverlay>
          <StyledActivityIndicator
            size="large"
            testID="activityLoading"
          />
        </LoadingOverlay>
      );
    }

    return null;
  };
  

  const RenderItem = ({ item }: { item: IProduct }) => {
    
    return (
      <>
        <ContainerItem
          onPress={() => {
            goToDetail(item);
          }}
          testID={"button" + item._id}
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

  return (
    <MainSafeAreaView>
      <DrawerMenu />
        {
          renderLoading(isLoading)
        }
        <TopScreen>
          <FlatList
            data={testeConnection}
            renderItem={({ item }: { item: IProduct }) => <RenderItem item={item} />}
            keyExtractor={(item: IProduct) => item._id}
            testID="flatListHome"
          />
          <View style={{ flexDirection: 'row' }}>
            <StyledButton title="Anterior" disabled={previewButton} onPress={() => getNewDataPage(currentPage -1)} />
            <StyledButton title="Próxima" disabled={nextButton} onPress={() => getNewDataPage(currentPage +1)} />
          </View>
      </TopScreen>

      <BottomScreen>
        <MyPositionView
          position={position}
          statusPosition={statusPosition}
          startGetGeoLocation={startGetGeoLocation}    
          cleanInfo={cleanInfo}
        />
      </BottomScreen>
    </MainSafeAreaView>
  );
};

export default HomeView;
