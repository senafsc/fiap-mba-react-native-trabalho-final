import React, { useState, useEffect } from "react";
import HomeView from "./HomeView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";

import useAPI from "../../Services/APIs/Common/useAPI";
import PersonsAPI from "../../Services/APIs/Persons/Persons";
import IPerson from "../../Interfaces/IPerson";
import { useAppSelector } from "../../Store/hooks";

import { getProductList ,IParamGetProductList } from "../../Services/APIs/ProductList/ProductList";
import IProductList from "../../Interfaces/IProductList";
import IProduct from "../../Interfaces/IProduct";


type iProps = StackScreenProps<RootStackParamList, "Produtos">;

const HomeController = ({ route, navigation }: iProps) => {

  const [testeConnection, setTesteConnection] = useState<IProduct[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProdutListGetApi = useAPI(getProductList);

  const userInfo = useAppSelector((state) => state.login.user);

  let currentPage = 1;
  console.log('LOG => USER_INFO: ', { userInfo });
  useEffect(() => {
    getNewDataPage (currentPage) // Sempre inicia busca a página 1;
  }, []);

  const getNewDataPage = async(pageIndex: number) => {
    setIsLoading(true);

    let params: IParamGetProductList = {
      page: pageIndex,
      perPage: 5,
      orderBy: 'name',
      orderDirection: 'asc',
    };

    currentPage = pageIndex;

    getProdutListGetApi
      .requestPromise(params, userInfo?.token)
      .then((productList: IProductList) => {
        console.log('LOG => PRODUCT_LIST: ', { productList });
        setTesteConnection(productList.products);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log('LOG => PRODUCT_LIST_ERROR: ', { error });
    });
  }

  const goToDetail = (item: IProduct) => {
    navigation.push("Details", { info: item });
  };

  return (
    <HomeView
      currentPage={currentPage}
      testeConnection={testeConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
      getNewDataPage={getNewDataPage}
    />
  );

};

export default HomeController;
