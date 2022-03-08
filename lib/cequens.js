import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";




export const CeqSupToken =  "xxxx";

export const SingInAsync = async (apikey, username) => {
  try {
    const response = await fetch("https://apis.cequens.com/sms/v1/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify({
        messageText: text,
        senderName: from,
        messageType: "text",
        clientMessageId: 0,
        acknowledgement: 0,
        recipients: to,
      }),
    });
    const json = await response.json();
    return json.data.access_token;
  } catch (error) {
    console.error(error);
  }
};

export const sendSMSAsync = async (from, to, text, Token) => {
  const response = await fetch("https://apis.cequens.com/sms/v1/messages", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify({
      messageText: text,
      senderName: from,
      messageType: "text",
      clientMessageId: 0,
      acknowledgement: 0,
      recipients: to,
    }),
  });
  const json = await response.json();
  console.log(json);
  if(json?.error?.description){
    alert(json?.error?.description)
    return false;
  }
  return json?.data?.SentSMSIDs[0]?.SMSId || null;
};
