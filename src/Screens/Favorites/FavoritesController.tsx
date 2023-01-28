import React, { useState, useEffect } from "react";
import FavoritesView from "./FavoritesView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";

import useAPI from "../../Services/APIs/Common/useAPI";
import { useAppSelector } from "../../Store/hooks";

import {getFavorites} from "../../Services/APIs/Favorites/Favorites";
import IProduct from "../../Interfaces/IProduct";
import IProductList from "../../Interfaces/IProductList";

type iProps = StackScreenProps<RootStackParamList, "Favorites">;

const FavoritesController = ({ route, navigation }: iProps) => {

  const [testeConnection, setTesteConnection] = useState<IProduct[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFavoritesGetApi = useAPI(getFavorites);

  const userInfo = useAppSelector((state) => state.login.user);

  console.log('LOG => USER_INFO: ', { userInfo });
  useEffect(() => {
    getData() // Sempre inicia busca a página 1;
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getData();
    });
  }, []);

  const getData = async() => {
    setIsLoading(true);

    getFavoritesGetApi
      .requestPromise(userInfo?.token)
      .then((productList: IProductList) => {
        console.log('LOG => FAVORITE_LIST: ', { productList });
        setTesteConnection(productList.products);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log('LOG => FAVORITE_LIST_ERROR: ', { error });
    });
  }

  const goToDetail = (item: IProduct) => {
    console.log('LOG => EXIBE_DETALHE: ', { item });
    item.favorite = true;
    navigation.navigate("Details", { info: item });
  };

  return (
    <FavoritesView
      testeConnection={testeConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
    />
  );

};

export default FavoritesController;
