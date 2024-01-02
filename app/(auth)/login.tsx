import { ImageBackground, StyleSheet, View,Image  } from "react-native";
import Header from "../../components/HeaderLogin";
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
        Institute/Stakeholder
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

  const [showLogin, setShowLogin] = useState("login");

  return (
    <>
      <view
       
        style={{ height: "100%", width: "100%", backgroundColor: "white" }}
      >
       <ImageBackground
       resizeMode="cover"
       source={require("../../assets/back.png")}
       style={{height:"100%",width:"100%",backgroundColor:"white"}}
       >
        <Header />
        <View style={styles.page}>
          <View style={styles.authContainer}>
            {showLogin === "login" ? (
              <TabHeader tab={tab} setTab={setTab} />
            ) : (
              <Text style={styles.tabText}>Create Stakeholder/Institute Account</Text>
            )}

            {tab === "institute" && showLogin === "signup" && (
              <View>
                <Text style={styles.headingText}>Insitute Name</Text>
                <TextInput value={name} onChangeText={(val) => setName(val)} />
              </View>
            )}
{tab === "institute" && showLogin === "login" && (
            <View>
              <Text style={styles.headingText}>Institute I'D</Text>
              <TextInput value={email} onChangeText={(val) => setEmail(val)} />
            </View>
 ) }
 {tab === "admin" && showLogin === "login" && (
 <View>
              <Text style={styles.headingText}>Admin I'D</Text>
              <TextInput value={email} onChangeText={(val) => setEmail(val)} />
            </View>
  )}
            <View>
              <Text style={styles.headingText}>Password</Text>
              <TextInput
                value={password}
                onChangeText={(val) => setPassword(val)}
                secureTextEntry={true}
              />
            </View>

            <Button
              title={showLogin === "login" ? "Login" : "SignUp"}
              style={styles.button}
              
              onPress={() => {
                if (showLogin === "login") user.login({ email, password, tab, name });
                else user.signup({ email, password, name });
              }}
            />

            <Text style={styles.dontText}>
              {showLogin === "login" ? "Don't" : "Already"} have a account?{" "}
              <Text
                onPress={() => {
                  if (showLogin === "login") setShowLogin("signup");
                  else setShowLogin("login");
                }}
                style={styles.buttonText}
              >
                {showLogin === "login" ? "Create One" : "Login"}
              </Text>
            </Text>
          </View>
        </View>
        </ImageBackground>
      </view>

      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
  },
  authContainer: {
    marginLeft: 0,
    // marginRight: 800,
    width: "27%",

    marginTop: "10%",
    padding: 40,

    borderRadius: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    gap: 20,
  
    backgroundColor: "white",
    marginLeft: "234px",
    marginTop: "71px",
  },

  headingText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    letterSpacing: 0.2,
    // color:"white"
  },

  button: {
    height: 40,
    marginTop: "10%",
    backgroundColor:"#fca311",
    color:"black"
  },

  tabHeaderContainer: {
    flexDirection: "row",
    
  },

  tabText: {
    flex: 1,
    textAlign: "center",
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
    height: 30,
    marginHorizontal: 20,
  },

  enabledTabText: {
    borderBottomWidth: 2,
    borderColor: "#FCA311",
  },

  dontText: {
    color: "black",
    fontSize: 16,
    letterSpacing: 0.02,
    textAlign: "center",
  },

  buttonText: {
    color: "black",
  },
});
