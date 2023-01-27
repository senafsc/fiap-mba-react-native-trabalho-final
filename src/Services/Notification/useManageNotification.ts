import { useEffect, useRef } from 'react'
import { Subscription } from "expo-modules-core";
import {
  useSetStorageItem,
  useGetStorageItem,
} from "../Storage/StorageServices";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

//Função para registrar notificação
async function registerForPushNotificationsAsync() {
    let token;
    //Verifica se é um smartphone
    if (Device.isDevice) {
      //Checa se o usuário permitiu notificações
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        //Senão permitiu, solicita a notificação
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Falha ao obter o token da notificação push");
        return;
      }

      //Busca o token único do celular
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Você precisa de um smartphone para receber notificações");
    } 

    if (Platform.OS === "android") {
        //Se For android, configura os canais para receber a notificação
        Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        });
    }

    return token;
}

export function useManageNotification() {
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  //Roda ao abrir o componente
  useEffect(() => {
    //Chama a função para registrar a notificação
    registerForPushNotificationsAsync().then(async (token) => {
      await useSetStorageItem("pushNotificationToken", token);
      console.log(token);
    });

    // Este listener é chamado quando uma notificação é recebida com o app em foreground
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Foreground notification");
        console.log(notification);
      });

    // Este listener é chamado quando o usuário toca ou interage com a notificação (funciona com o app em foreground, background ou fechado)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Background touched notification");
        console.log(response);
      });

    return () => {
      //Remove os listeners das notificações
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);
}

//Configura a notificação se o aplicativo estiver aberto
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function useGetToken() {
  return (await useGetStorageItem("pushNotificationToken")) ?? "-13";
}

