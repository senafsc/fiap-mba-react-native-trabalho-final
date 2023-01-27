import React from "react";
import {
  BottomScreen,
  LabelProfile,
  ProfileBox,
  Title,
  MainSafeAreaView,
  TopScreen,
  LabelProfileInfo,
} from "./ProfileStyles";

import Colors from "../../Styles/Colors";

type IProps = {
  userData: any
};

const ProfileView = ({ userData }: IProps) => {

  return (
    <MainSafeAreaView>
      <TopScreen>
        <Title style={{ color: Colors.brown }}>Detalhes do usuário:</Title>
      </TopScreen>
      <BottomScreen>
        <ProfileBox style={{ borderColor: Colors.blueviolet }}>
          <LabelProfile>Nome:</LabelProfile>
          <LabelProfileInfo style={{ color: Colors.navy }}>{userData.name}</LabelProfileInfo>

          <LabelProfile>Telefone:</LabelProfile>
          <LabelProfileInfo style={{ color: Colors.navy }}>{userData.phone}</LabelProfileInfo>

          <LabelProfile>ID:</LabelProfile>
          <LabelProfileInfo style={{ color: Colors.navy }}>{userData.userId}</LabelProfileInfo>
        </ProfileBox>
      </BottomScreen>
    </MainSafeAreaView>
  );
};

export default ProfileView;
