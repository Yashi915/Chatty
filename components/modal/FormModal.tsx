import React, { useEffect, useRef } from "react";
import { View, Text, Modal, StyleSheet, ScrollView } from "react-native";
import Button from "../native/Button";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import TextInput from "../native/TextInput";
import { modal } from "../../store/modal";
import { Observer } from "mobx-react-lite";
import { PDFDocument } from "pdf-lib";
import { savePDFToFile } from "../../utils/savePDFToFile";
import Toast from "react-native-toast-message";
import { Asset } from "expo-asset";
import { Formik, FormikProps } from "formik";

type FormikRef = React.RefObject<FormikProps<{}>>;

export const FormModal = () => {
  const ref: FormikRef = useRef(null);

  async function fillForm(values: any) {
    const asset = Asset.fromModule(modal?.formData?.path);

    const formUrl = asset.uri;
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(formPdfBytes);

    const form = pdfDoc.getForm();

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const value = values[key];
        form.getTextField(key).setText(value);
      }
    }

    const pdfBytes = await pdfDoc.save();

    savePDFToFile(pdfBytes, modal?.formData?.name);

    Toast.show({
      type: "info",
      text1: "PDF form filled successfully!",
    });
  }

  return (
    <Observer>
      {() => (
        <Modal visible={modal.shown} transparent>
          <View style={styles.opacity}>
            <View style={styles.container}>
              <ScrollView contentContainerStyle={{ padding: 40, gap: 40 }}>
                <View style={styles.modalHeader}>
                  <Text style={styles.heading}>{modal?.formData?.name}</Text>

                  <Entypo onPress={() => modal.closeModal()} name="cross" size={32} color="black" />
                </View>

                <Formik
                  innerRef={ref}
                  initialValues={modal?.formatNameObject}
                  onSubmit={(values, formikActions) => {
                    fillForm(values);
                  }}
                >
                  {(props) => (
                    <View style={{ gap: 20 }}>
                      {modal?.formData?.field.map((item: any) => {
                        return (
                          <View
                            key={`feildName-${item?.name}-${modal?.formData?.name}`}
                            style={{ flexDirection: "row", alignItems: "center", gap: 40 }}
                          >
                            <Text style={styles.label}>{item?.name}</Text>

                            <TextInput
                              onChangeText={props.handleChange(`${item?.formatName}`)}
                              value={props.values[item?.formatName]}
                            />
                          </View>
                        );
                      })}
                    </View>
                  )}
                </Formik>
              </ScrollView>

              <View style={styles.footer}>
                <Button
                  onPress={() => {
                    ref.current?.submitForm();
                  }}
                  title="Preview / Print"
                  style={{ height: 50 }}
                />
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
