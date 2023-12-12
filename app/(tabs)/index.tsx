import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";

const FAQComponent = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://127.0.0.1:8000/ws");

    newSocket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    newSocket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setAnswer(data.answer);
      setScore(data.score);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []); // Empty dependency array to ensure the effect runs once on component mount

  const handleAskQuestion = () => {
    if (socket) {
      socket.send(userQuestion);
    }
  };

  return (
    <View>
      <Text>Ask a Question:</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10 }}
        onChangeText={(text) => setUserQuestion(text)}
        value={userQuestion}
      />
      <Button title="Ask" onPress={handleAskQuestion} />
      <Text>Answer: {answer}</Text>
      <Text>Score: {score}</Text>
    </View>
  );
};

export default FAQComponent;

// import { StyleSheet, Text, View, Platform, SafeAreaView, Image } from "react-native";
//
// import { useCallback, useEffect, useState } from "react";
//
// import { Avatar, GiftedChat, IMessage, Message } from "react-native-gifted-chat";
//
// interface MessageProps extends IMessage {
//   messageType: string;
// }
//
// export default function TabOneScreen() {
//   const [messages, setMessages] = useState<MessageProps[]>([]);
//
//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "hello",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "React Native",
//           avatar: "https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg",
//         },
//         messageType: "hello",
//       },
//     ]);
//   }, []);
//
//   const onSend = useCallback((messages: MessageProps[]) => {
//     setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
//   }, []);
//
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Image
//           style={{ height: 40, width: 40, borderRadius: 20 }}
//           source={{
//             uri: "https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg",
//           }}
//         />
//         <View>
//           <Text style={styles.headingText}>APH chat</Text>
//           <Text style={styles.subHeadingText}>A few minutes</Text>
//         </View>
//       </View>
//       <GiftedChat
//         messages={messages}
//         onSend={(messages: MessageProps[]) => onSend(messages)}
//         renderMessage={(props) => {
//           console.log("rpos", props);
//           return <Message {...props} />;
//         }}
//         user={{
//           _id: 1,
//         }}
//       />
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: "#3047EC",
//     padding: 20,
//     gap: 30,
//     ...Platform.select({
//       android: {
//         paddingTop: 50,
//       },
//     }),
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   headingText: {
//     fontSize: 18,
//     lineHeight: 18,
//     fontFamily: "SpaceMono",
//     color: "white",
//     fontWeight: "700",
//   },
//   subHeadingText: {
//     fontSize: 14,
//     lineHeight: 18,
//     fontFamily: "SpaceMono",
//     color: "white",
//   },
//   container: {
//     ...Platform.select({
//       web: {
//         height: 723,
//         width: 450,
//         alignSelf: "center",
//         marginVertical: "auto",
//         borderRadius: 18,
//         overflow: "hidden",
//         shadowColor: "#000000",
//         shadowOffset: {
//           width: 0,
//           height: 3,
//         },
//         shadowOpacity: 0.17,
//         shadowRadius: 3.05,
//         elevation: 4,
//       },
//       android: {
//         flex: 1,
//       },
//     }),
//     backgroundColor: "white",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
// });
