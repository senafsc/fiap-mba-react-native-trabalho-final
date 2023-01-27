import React, { useState, useEffect } from "react";
import HomeView from "./HomeView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";

import useAPI from "../../Services/APIs/Common/useAPI";
import PersonsAPI from "../../Services/APIs/Persons/Persons";
import IPerson from "../../Interfaces/IPerson";

type iProps = StackScreenProps<RootStackParamList, "Produtos">;

const HomeController = ({ route, navigation }: iProps) => {

  const [dataConnection, setDataConnection] = useState<IPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPersonsGetAPI = useAPI(PersonsAPI.getAllPersons);

  useEffect(() => {
    getDataPage();    
  }, []);

  const getDataPage = async () => {
    // let token = await useGetToken();
    
    setIsLoading(true);
    getPersonsGetAPI
      .requestPromise('')
      .then((info: any) => {
        setIsLoading(false);
        setDataConnection(info.persons);
      })
      .catch((error: string) => {
        console.log(error);
      });
  };

  const goToDetail = (item: IPerson) => {
    navigation.push("Details", {
      itemID: item.id,
      info: JSON.stringify(item),
    });
  };

  return (
    <HomeView
      dataConnection={dataConnection}
      isLoading={isLoading}
      goToDetail={goToDetail}
    />
  );

};

export default HomeController;
