import React, { useState, useEffect } from "react";
import HomeView from "./HomeView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";

import useAPI from "../../Services/APIs/Common/useAPI";
import PersonsAPI from "../../Services/APIs/Persons/Persons";
import IPerson from "../../Interfaces/IPerson";
// import { useGetToken } from "../../Services/Notification/useManageNotification";
import { Button } from "react-native-elements"
import { useAppDispatch } from "../../Store/hooks";
import { cleanUser } from "../../Store/Login/LoginSlice";

type iProps = StackScreenProps<RootStackParamList, "Home">;

const HomeController = ({ route, navigation }: iProps) => {

  const [dataConnection, setDataConnection] = useState<IPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPersonsGetAPI = useAPI(PersonsAPI.getAllPersons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => dispatch(cleanUser())}
          title="Logoff"
          type="clear"
          titleStyle={{ color: "white" }}
        />
      ),
    });
  }, [navigation]);

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
