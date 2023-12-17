import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const content = [
  {
    name: "About",
    action: "",
  },
  {
    name: "Features",
    action: "",
  },
  {
    name: "Create Document",
    action: "/create_document",
  },
  {
    name: "Team",
    action: "",
  },
];

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.contentContainer}>
        {content.map((item, i) => (
          <Text
            key={`header-item-${item}-${i}`}
            onPress={() => {
              if (item?.action) {
                router.push("/create_document");
              } else {
                Toast.show({
                  type: "info",
                  text1: "Warning!",
                  text2: "yet to be implemented 👋",
                });
              }
            }}
            style={styles.headerText}
          >
            {item?.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop: 35,
    paddingBottom: 30,
    backgroundColor: "white",
    paddingHorizontal: 149,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  headerText: {
    fontSize: 16,
  },
  contentContainer: {
    flexDirection: "row",
    gap: 40,
  },
});
