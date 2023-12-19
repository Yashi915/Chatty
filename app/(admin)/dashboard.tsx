import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/bg.png")}
        style={{ height: "100%", width: "100%", backgroundColor: "white" }}
      >
        <Header />
        <View>
          <Text>AdminDashboard</Text>
        </View>
      </ImageBackground>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
