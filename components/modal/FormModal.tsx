import React from "react";
import { View, Text, Modal, StyleSheet, ScrollView } from "react-native";
import Button from "../native/Button";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import TextInput from "../native/TextInput";
import { modal } from "../../store/modal";
import { Observer } from "mobx-react-lite";

export const FormModal = () => {
  return (
    <Observer>
      {() => (
        <Modal visible={modal.shown} transparent>
          <View style={styles.opacity}>
            <View style={styles.container}>
              <ScrollView contentContainerStyle={{ padding: 40, gap: 40 }}>
                <View style={styles.modalHeader}>
                  <Text style={styles.heading}>Certificate of Advocate</Text>

                  <Entypo onPress={() => modal.closeModal()} name="cross" size={32} color="black" />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 40 }}>
                  <Text style={styles.label}>Name of Advocate</Text>

                  <TextInput placeholder="Please fill advocate name" />
                </View>
              </ScrollView>

              <View style={styles.footer}>
                <Button title="Preview / Print" style={{ height: 50 }} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Observer>
  );
};

const styles = StyleSheet.create({
  opacity: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
  },
  container: {
    backgroundColor: "white",
    alignSelf: "flex-end",
    width: "40%",
    flex: 1,
    marginRight: 20,
    marginTop: 50,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
  },

  footer: {
    paddingVertical: 20,

    alignItems: "flex-end",
    justifyContent: "center",

    borderWidth: 1,

    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    paddingHorizontal: 40,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
  },
});
