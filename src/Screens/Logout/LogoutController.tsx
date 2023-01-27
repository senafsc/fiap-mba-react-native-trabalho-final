import React, { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../Routes/RouteController";


import { useAppDispatch } from "../../Store/hooks";
import { cleanUser } from "../../Store/Login/LoginSlice";

type IProps = StackScreenProps<RootStackParamList, "LogoutHandler">;

export default function LogoutController({ navigation }: IProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cleanUser());
  }, [navigation]);
}
