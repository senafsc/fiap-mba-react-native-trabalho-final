import React, { useState, useEffect } from "react";
import HomeView from "./HomeView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";

import useAPI from "../../Services/APIs/Common/useAPI";
import { useAppSelector } from "../../Store/hooks";

import { getProductList ,IParamGetProductList } from "../../Services/APIs/ProductList/ProductList";
import IProductList from "../../Interfaces/IProductList";
import IProduct from "../../Interfaces/IProduct";

import * as Location from "expo-location";
import { LocationObject } from "expo-location";

type iProps = StackScreenProps<RootStackParamList, "Produtos">;

let doUpdate = true;

const HomeController = ({ route, navigation }: iProps) => {

  const [testeConnection, setTesteConnection] = useState<IProduct[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Inicializa status currentPage
  const [currentPage, setCurrentPage] = useState(0);
  const [previewButton, setPreviewButton] = useState<boolean>(false);
  const [nextButton, setNextButton] = useState<boolean>(false);

  //Criando os states para buscar a localização
  const [position, setPosition] = useState<LocationObject | null>(null);
  const [statusPosition, setStatusPosition] = useState<number>(0);

   const startGetGeoLocation = (type: number) => {
    setTimeout(async () => {
      //Verifica se o usuário já deu a permissão e, caso não tenha, solicita a permissão
      let { status } = await Location.requestForegroundPermissionsAsync();
      //Retorna o erro
      if (status !== "granted") {
        setStatusPosition(-1);
        return;
      }

      //Com o permissão em ordem, busca a posição do usuário assincronamente
      let currentPosition;
      if (type === 0) {
        currentPosition = await Location.getCurrentPositionAsync({});
      } else {
        currentPosition = await Location.getLastKnownPositionAsync({});
      }

      setPosition(currentPosition);
      setStatusPosition(2);

      console.log(currentPosition);
    }, 1000);
  };

  const cleanInfo = () => {
    setStatusPosition(0);
  };

  const getProdutListGetApi = useAPI(getProductList);

  const userInfo = useAppSelector((state) => state.login.user);

  // console.log('LOG => USER_INFO: ', { userInfo });
  useEffect(() => {
    getNewDataPage(1) // Sempre inicia busca a página 1;
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getNewDataPage(1);
    });
  }, []);

  const getNewDataPage = async(pageIndex: number) => {
    console.log('LOG => GET_NEW_DATA_PAGE_1: ', { pageIndex, currentPage: currentPage.toString() });

    if (pageIndex === 1) {
      setPreviewButton(true);
    } else {
      setPreviewButton(false);
    }
    console.log('LOG => GET_NEW_DATA_PAGE_2: ', currentPage);
    setIsLoading(true);

    let params: IParamGetProductList = {
      page: pageIndex,
      perPage: 3,
      orderBy: 'name',
      orderDirection: 'asc',
    };

    let self = this;
    getProdutListGetApi
      .requestPromise(params, userInfo?.token)
      .then((productList: IProductList) => {
        // console.log('LOG => PRODUCT_LIST: ', { productList, calculo: productList.page * productList.perPage });
        setTesteConnection(productList.products);
        if (productList.page * productList.perPage >= productList.totalItems) {
          setNextButton(true);
        } else {
          setNextButton(false);
        }
        setIsLoading(false);

        setCurrentPage(parseInt(productList.page, 10));
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log('LOG => PRODUCT_LIST_ERROR: ', { error });
    });
  }

  if (route?.params?.update === true && doUpdate === true) {
    doUpdate = false;
    getNewDataPage(currentPage);
  }

  const goToDetail = (item: IProduct) => {
    console.log('LOG => EXIBE_DETALHE: ', { item });
    navigation.navigate("Details", { info: item });
  };

  return (
    <HomeView
      currentPage={currentPage}
      testeConnection={testeConnection}
      isLoading={isLoading}
      previewButton={previewButton}
      nextButton={nextButton}
      goToDetail={goToDetail}
      getNewDataPage={getNewDataPage}
      position={position}
      statusPosition={statusPosition}
      startGetGeoLocation={startGetGeoLocation}    
      cleanInfo={cleanInfo}
    />
  );

};

export default HomeController;
