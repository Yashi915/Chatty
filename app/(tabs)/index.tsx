import { StyleSheet, Text, View } from "react-native";

import { useCallback, useEffect, useRef, useState } from "react";

import { GiftedChat, Message } from "react-native-gifted-chat";

export default function TabOneScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        renderMessage={(props) => {
          return <Message {...props} />;
        }}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
