import React from "react";
import { ScrollView } from "react-native";

import {
  MainContainer,
  TextName,
  TextTitle,
  TextDetail,
  TextNoInfo,
  StyledImage,
} from "./DetailStyles";
import Person from "../../Interfaces/IPerson";

type iProps = {  
  objectItem: Person | null;
};
const DetailView = ({ objectItem }: iProps) => {
  if (!objectItem) {
    return (
      <>
        <TextNoInfo>Sem informações</TextNoInfo>
      </>
    );
  }
  return (
    <MainContainer>
      <ScrollView>
        <StyledImage source={{ uri: objectItem.image }} />
        <TextName>
          {objectItem.firstName} {objectItem.lastName}
        </TextName>
        <TextTitle>Endereço</TextTitle>
        <TextDetail>
          {objectItem.firstName} {objectItem.lastName}
        </TextDetail>
        <TextTitle>Ocupação</TextTitle>
        <TextDetail>{objectItem.jobTitle}</TextDetail>
        <TextTitle>Tipo</TextTitle>
        <TextDetail>
          {objectItem.jobType} / {objectItem.jobArea}
        </TextDetail>
        <TextTitle>Endereço</TextTitle>
        <TextDetail>{objectItem.address}</TextDetail>
        <TextDetail>{objectItem.zipCode}</TextDetail>
        <TextDetail>
          {objectItem.city} / {objectItem.state} / {objectItem.coutry}
        </TextDetail>
        <TextTitle>Telefone</TextTitle>
        <TextDetail>{objectItem.phone}</TextDetail>
      </ScrollView>
    </MainContainer>
  );
};

export default DetailView;
