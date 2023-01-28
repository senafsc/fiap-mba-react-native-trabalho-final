import React from "react";
import DetailView from "./DetailView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import useAPI from "../../Services/APIs/Common/useAPI";
import IProduct from "../../Interfaces/IProduct";
import { useAppSelector } from "../../Store/hooks";
import { postManageFavorite } from "../../Services/APIs/ManageFavorite/ManageFavorite";

type iProps = StackScreenProps<RootStackParamList, "Details">;

const DetailController = ({ navigation, route }: iProps) => {
    const userInfo = useAppSelector((state) => state.login.user); 
    const getProdutListGetApi = useAPI(postManageFavorite);

    const manageFavorite = (data: any) => {
      try {
        console.log('LOG => data: ', { data: data.objectID });
        getProdutListGetApi
          .requestPromise(data.objectID, userInfo?.token)
          .then((response: any) => {
            navigation.push("Produtos", { update: true });
          })
          .catch((error: any) => {
            console.log('LOG => Erro ao atualizar o item: ', { error });
        });
      } catch (error) {
        console.log('LOG => MANNGAGE_FAVORITE_ERRROR: ', { error });
      }
    }

    let objectItem = null;
    if (route && route.params) {
      const { info } = route.params;
      objectItem = info as IProduct;
    }

    return <DetailView objectItem={objectItem} manageFavorite={manageFavorite} />;
};

export default DetailController;
