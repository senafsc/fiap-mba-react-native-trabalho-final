import React from "react";
import { TouchableOpacity } from "react-native";

import {
  MainContainer,
  TextName,
  TextTitle,
  TextButton,
  TextNoInfo,
} from "./DetailStyles";
import IProduct from "../../Interfaces/IProduct";

type iProps = {  
  objectItem: IProduct | null;
  manageFavorite: (data: any) => void
};
const DetailView = ({ objectItem, manageFavorite }: iProps) => {
  if (!objectItem) {
    return (
      <>
        <TextNoInfo>Sem informações</TextNoInfo>
      </>
    );
  }
  return (
    <MainContainer>
      <TextName>{objectItem.name}</TextName>
      <TextTitle>{`Favorito: ${objectItem.favorite ? 'Sim' : 'Não'}`}</TextTitle>
      <TextNoInfo>{`Preço: R$ ${objectItem.price}`}</TextNoInfo>
      
      <TouchableOpacity onPress={() => manageFavorite({ objectID: objectItem._id })}>
        <TextButton>{`${objectItem.favorite ? 'Remover item dos favoritos' : 'Adicionar item aos favoritos'}`}</TextButton>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default DetailView;
