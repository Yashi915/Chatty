import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { user } from "../store/user";
import Colors from "../constants/Colors";
import Button from "./native/Button";
import { Observer } from "mobx-react-lite";

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
    <Observer>
      {() => (
        <View style={{ width: 100, height: 100 }}>
          <Image source={require("../assets/logo.png")} style={{ width: 100, height: 100 }} />
        <View style={styles.header}>
          <View style={styles.contentContainer}>
            {user?.isloggedIn &&
              content.map((item, i) => (
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

            {user?.isloggedIn && (
              <>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user?.name?.length && user?.name[0]}</Text>
                </View>

                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{user?.name}</Text>
                  <Text style={styles.email}>{user?.email}</Text>
                </View>

                <Button
                  title="Logout"
                  onPress={() => {
                    user?.logout();
                  }}
                  style={{ marginVertical: 30, marginLeft: 10 }}
                />
              </>
            )}
          </View>
        </View>
        </View>
      )}
    </Observer>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",

    backgroundColor: "white",
    paddingHorizontal: 149,

    borderColor: Colors.border,
    borderBottomWidth: 1,
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
    alignSelf: "center",
  },
  contentContainer: {
    flexDirection: "row",
    gap: 40,
    flex: 1,
  },

  infoContainer: { alignSelf: "center" },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  email: {
    color: Colors.charcol_grey,
    fontSize: 14,
    letterSpacing: 0.02,
  },

  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    marginLeft: "auto",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  avatarText: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
});
