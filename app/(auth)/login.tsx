import { StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import Text from "../../components/native/Text";
import TextInput from "../../components/native/TextInput";
import Button from "../../components/native/Button";
import Colors from "../../constants/Colors";
import { useState } from "react";
import { user } from "../../store/user";
import Toast from "react-native-toast-message";

const TabHeader = ({ tab, setTab }: any) => {
  return (
    <View style={styles.tabHeaderContainer}>
      <Text
        onPress={() => setTab("institute")}
        style={[styles.tabText, tab === "institute" && styles.enabledTabText]}
      >
        Institute/Stackholder
      </Text>

      <Text
        onPress={() => setTab("admin")}
        style={[styles.tabText, tab === "admin" && styles.enabledTabText]}
      >
        Admin
      </Text>
    </View>
  );
};

export default function Login() {
  const [tab, setTab] = useState("institute");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Header />
      <View style={styles.page}>
        <View style={styles.authContainer}>
          <TabHeader tab={tab} setTab={setTab} />

          {tab === "institute" && (
            <View>
              <Text style={styles.headingText}>Insitute Name</Text>
              <TextInput value={name} onChangeText={(val) => setName(val)} />
            </View>
          )}

          <View>
            <Text style={styles.headingText}>Email Address</Text>
            <TextInput value={email} onChangeText={(val) => setEmail(val)} />
          </View>

          <View>
            <Text style={styles.headingText}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(val) => setPassword(val)}
              secureTextEntry={true}
            />
          </View>

          <Button
            title="Login"
            style={styles.button}
            onPress={() => {
              user.login({ email, password, tab, name });
            }}
          />
        </View>
      </View>

      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  authContainer: {
    marginLeft: "auto",
    marginRight: 200,
    width: "20%",
    height: "60%",

    padding: 40,

    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    gap: 20,
  },

  headingText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    letterSpacing: 0.2,
  },

  button: {
    height: 40,
    marginTop: "auto",
  },

  tabHeaderContainer: {
    flexDirection: "row",
  },

  tabText: {
    flex: 1,
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "bold",

    height: 30,
    marginHorizontal: 20,
  },

  enabledTabText: {
    borderBottomWidth: 2,
    borderColor: Colors.primary,
  },
});
