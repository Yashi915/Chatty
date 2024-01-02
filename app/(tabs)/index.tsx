import { StyleSheet, Text, View, Platform, Image, ImageBackground } from "react-native";
import { GiftedChat, Message } from "react-native-gifted-chat";
import RelatedQustion from "../../components/RelatedQustion";
import { chat } from "../../store/chat";
import { Observer } from "mobx-react-lite";
import Header from "../../components/Header";
import Options from "../../components/Options";

const ChatHeader = () => (
  
  <View style={styles.header}>
 
    <Image
      style={{ height: 40, width: 40, borderRadius: 20 }}
      source={{
        uri: "https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg",
      }}
    />
    <View>
      <Text style={styles.headingText}>APH chat</Text>
      <Text style={styles.subHeadingText}>Online Now</Text>
    </View>
  </View>
  
);

export default function ChatScreen() {
  return (
   <view>
      <Header />
      <view>
              
   </view>

      <View style={styles.container}>
        <ChatHeader />

        <Observer>
          {() => (
            <GiftedChat
              messages={chat.messages}
              onSend={(messages) => chat.send(messages)}
              renderMessage={(props) => {
                if (props?.currentMessage?.messageType === "Related Question") {
                  return <RelatedQustion {...props} />;
                }

                if (props?.currentMessage?.messageType === "Options") {
                  return <Options {...props} />;
                }

                return <Message {...props} />;
              }}
              user={{
                _id: 1,
              }}
            />
          )}
        </Observer>
        
      </View>
      
    </view>
  
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#22597D",
    
    padding: 12,
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
        height: 640,
        width: 1520,
        alignSelf: "center",
        marginVertical: "auto",
        // borderRadius: 18,
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
    // marginLeft:387,
    // marginTop:-722,
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
