import { StyleSheet, Text, View, Platform, Image, Pressable } from "react-native";

import { useCallback, useEffect, useState } from "react";

import { Avatar, GiftedChat, IMessage, Message } from "react-native-gifted-chat";

import { NlpManager } from "node-nlp-rn";

import Faq from "../../assets/json/faq.json";

import { AntDesign } from "@expo/vector-icons";

interface MessageProps extends IMessage {
  messageType: String;
  relatedQuestionAnswer: [];
}

const manager = new NlpManager({ languages: ["en"], forceNER: true });

export default function TabOneScreen() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    const trainManager = async () => {
      manager.addDocument("en", "HELLO", "HELLO");

      manager.addAnswer("en", "Hello How are you", "HELLO");

      for (let i = 0; i < Faq.length; i++) {
        manager.addDocument("en", Faq[i].question, Faq[i].question);
        manager.addAnswer("en", Faq[i].answer, Faq[i].question);
      }

      await manager.train();
    };

    trainManager();
  }, []);

  const getResponse = async (question: String) => {
    const res = await manager.process("en", question);

    let bestQustionLable = "";
    let bestAccuracy = 0;

    let relatedQuestionLable = [];

    for (let i = 0; i < res?.classifications?.length; i++) {
      if (
        res?.classifications[i]?.value > bestAccuracy &&
        res?.classifications[i]?.label !== "None"
      ) {
        bestQustionLable = res?.classifications[i]?.label;
        bestAccuracy = res?.classifications[i]?.value;
      }
      if (res?.classifications[i]?.value > 0.02 && res?.classifications[i]?.label !== "None") {
        relatedQuestionLable.push(res?.classifications[i]?.label);
      }
    }

    if (bestQustionLable) {
      relatedQuestionLable = relatedQuestionLable.filter((item) => item !== bestQustionLable);
    }

    let bestAnswer = "";
    let relatedQuestionAnswer = [];

    for (let i = 0; i < Faq.length; i++) {
      if (bestQustionLable && bestQustionLable === Faq[i]?.question) {
        bestAnswer = Faq[i]?.answer;
      }

      for (let j = 0; j < relatedQuestionLable?.length; j++) {
        if (relatedQuestionLable[j] === Faq[i]?.question) {
          relatedQuestionAnswer.push(Faq[i]);
        }
      }
    }

    if (!bestAnswer && relatedQuestionAnswer?.length === 0) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
          _id: Math.random() * 1000000,
          text: "I'm sorry, but I couldn't find a solution to your query. It's possible that your question is unique or not covered in the existing FAQs. Please consider rephrasing your question or providing more details, and I'll do my best to assist you. If the issue persists, you may also reach out to [customer support/contact information] for personalized assistance. Thank you for your understanding.",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "chat",
            avatar: "https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg",
          },
        })
      );
    }

    if (bestAnswer) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
          _id: Math.random() * 1000000,
          text: bestAnswer,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "chat",
            avatar: "https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg",
          },
        })
      );
    }

    if (relatedQuestionAnswer?.length !== 0) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
          _id: Math.random() * 1000000,
          text: "Related Question",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "chat",
            avatar: "https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg",
          },
          messageType: "Related Question",
          relatedQuestionAnswer: relatedQuestionAnswer,
        })
      );
    }
  };

  const onSend = useCallback((messages: MessageProps[]) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

    getResponse(messages[0]?.text);
  }, []);

  const RelatedQustionMessage = ({ ...props }) => {
    const [shown, setShown] = useState(false);

    return (
      <View
        style={{
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          margin: 8,
          padding: 8,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Related Question</Text>

        {props?.currentMessage?.relatedQuestionAnswer.map((item) => (
          <>
            <Pressable
              onPress={() => setShown(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ flex: 1 }}>{item?.question}</Text>
              <AntDesign name="right" size={20} color="black" />
            </Pressable>
            {shown ? <Text style={{ color: "grey" }}>{item?.answer}</Text> : null}
          </>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={{ height: 40, width: 40, borderRadius: 20 }}
          source={{
            uri: "https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg",
          }}
        />
        <View>
          <Text style={styles.headingText}>APH chat</Text>
          <Text style={styles.subHeadingText}>A few minutes</Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages: MessageProps[]) => onSend(messages)}
        renderMessage={(props) => {
          if (props?.currentMessage?.messageType === "Related Question") {
            return <RelatedQustionMessage {...props} />;
          }

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
  header: {
    backgroundColor: "#3047EC",
    padding: 20,
    gap: 30,
    ...Platform.select({
      android: {
        paddingTop: 50,
      },
    }),
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    fontSize: 18,
    lineHeight: 18,

    color: "white",
    fontWeight: "700",
  },
  subHeadingText: {
    fontSize: 14,
    lineHeight: 18,

    color: "white",
  },
  container: {
    ...Platform.select({
      web: {
        height: 723,
        width: 450,
        alignSelf: "center",
        marginVertical: "auto",
        borderRadius: 18,
        overflow: "hidden",
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4,
      },
      android: {
        flex: 1,
      },
    }),
    backgroundColor: "white",
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
