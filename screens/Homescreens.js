import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import io from "socket.io-client";

export default function HomeScreen() {
  const [messageToSend, setMessageToSend] = useState("");
  const [recvMessages, setRecvMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://192.168.43.193:3001");
    socket.current.on("message", message => {
      setRecvMessages(prevState => [...prevState, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.current.emit("message", messageToSend);
    setMessageToSend("");
  };

  const textOfRecvMessages = recvMessages.map(msg => (
    <Text key={msg}>{msg}</Text>
  ));

  return (
    <View style={styles.container}>
      {textOfRecvMessages}
      <TextInput
        value={messageToSend}
        onChangeText={ text => setMessageToSend(text)}
        placeholder="Enter chat messsage.."
        onSubmitEditing={sendMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});