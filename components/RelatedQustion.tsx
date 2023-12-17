import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const RelatedQustion = ({ ...props }) => {
  const [shown, setShown] = useState(false);

  return (
    <View style={styles.relatedQuestionCnt}>
      <Text style={{ fontWeight: "bold" }}>Related Question</Text>

      {props?.currentMessage?.relatedQuestionAnswer.map((item) => (
        <>
          <Pressable
            key={`related_ques_${item?._id}`}
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

export default RelatedQustion;

const styles = StyleSheet.create({
  relatedQuestionCnt: {
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
  },
});
