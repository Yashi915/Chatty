import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { chat } from "../store/chat";

const Options = ({ ...props }) => {
  console.log("dfd", props?.currentMessage?.options);
  return (
    <View style={{ flexDirection: "row", padding: 20, gap: 20, flexWrap: "wrap" }}>
      {props?.currentMessage?.options.map((item: any) => (
        <>
          <Pressable
            key={`options-value${item?.name}`}
            onPress={() => {
              chat.addUserMessage(item?.name);
              if (item?.action) {
                chat.addAction(item?.action);
              } else if (item?.response) {
                chat.addResponse(item?.response);
              }
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.optionText}>{item?.name} </Text>
          </Pressable>
        </>
      ))}
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  optionText: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    color: Colors.primary,
    fontWeight: "bold",
  },
});
