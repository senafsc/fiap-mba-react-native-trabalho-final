import React from "react";
import DetailView from "./DetailView";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import IPerson from "../../Interfaces/IPerson";
import { Text } from "react-native-elements";

type iProps = StackScreenProps<RootStackParamList, "Details">;

const DetailController = ({ navigation, route }: iProps) => {
    let objectItem = null;
    if (route && route.params) {
      // const { info } = route.params;
      // objectItem = JSON.parse(info) as IPerson;
    }

    // return <DetailView objectItem={objectItem} />;
    return <Text>Meu primeiro teste</Text>
};

export default DetailController;
