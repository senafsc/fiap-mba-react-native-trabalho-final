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

  const [dataConnection, setDataConnection] = useState<IPerson[]>([]);
  const [testeConnection, setTesteConnection] = useState<IProduct[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPersonsGetAPI = useAPI(PersonsAPI.getAllPersons);
  const getProdutListGetApi = useAPI(getProductList);

  const userInfo = useAppSelector((state) => state.login.user);
  console.log('LOG => USER_INFO: ', { userInfo });
  useEffect(() => {
    // getDataPage();   
    getNewDataPage ()
  }, []);

  const getNewDataPage = async () => {
    setIsLoading(true);

    let params: IParamGetProductList = {
      page: 0,
      perPage: 5,
      orderBy: 'name',
      orderDirection: 'asc',
    };

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

  // const getDataPage = async () => {
  //   // let token = await useGetToken();
    
  //   setIsLoading(true);
  //   getPersonsGetAPI
  //     .requestPromise('')
  //     .then((info: any) => {
  //       setIsLoading(false);
  //       setDataConnection(info.persons);
  //     })
  //     .catch((error: string) => {
  //       console.log(error);
  //     });
  // };

  const goToDetail = (item: IProduct) => {
    navigation.push("Details", {
      itemID: item.id,
      // info: JSON.stringify(item),
    });
  };

  console.log('LOG => TESTE_CONNECTION: ', { testeConnection })

  return (
    <HomeView
      dataConnection={dataConnection}
      testeConnection={testeConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
    />
  );

};

export default HomeController;
