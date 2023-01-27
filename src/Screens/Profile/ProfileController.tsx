import React, { useState } from "react";
import ProfileView from "./ProfileView";

import useAPI from "../../Services/APIs/Common/useAPI";
import { getSignIn, IParamGetSignIn } from "../../Services/APIs/User/User";
import IUserInfo from "../../Interfaces/iUserInfo";

import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { loggedUser } from "../../Store/Login/LoginSlice";
import { ToastAndroid } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";
import IUCreateUser from "../../Interfaces/IUCreateUser";

type iProps = StackScreenProps<RootStackParamList, "Profile">

const ProfileController = ({ route, navigation }: iProps) => {
  const userInfo = useAppSelector((state) => state.login.user);
  console.log('LOG => userInfo: ', { userInfo });

  return <ProfileView userData={userInfo} />;
};

export default ProfileController;
