import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/native/Button";
import Toast from "react-native-toast-message";
import { modal } from "../store/modal";

const certificateList = [
  {
    name: "Certificate of an Advocate",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
    field: [
      {
        name: "Trust/ Society/ Company",
        formatName: "org_name",
      },
      {
        name: "Name and address of the Applicant",
        formatName: "name_and_address",
      },
      {
        name: "Registration Certicate No.",
        formatName: "reg_cert_no",
      },
      {
        name: "Date of Registration",
        formatName: "date",
      },
    ],
  },
  {
    name: "Certificate of an some otehr",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
];

const AccordionExpancedItem = ({ content }: any) => {
  return (
    <>
      {content.map((item: { name: string; path: string }) => {
        return (
          <View
            key={`acc-item-${name}`}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.content}>{item?.name}</Text>
            <Button
              title="Create"
              text={{ style: { fontSize: 14, fontWeight: "bold" } }}
              onPress={() => {
                modal.setFormData(item);
                modal.showModal();
              }}
            />
          </View>
        );
      })}
    </>
  );
};

const AccordionItem = ({ title, content }: { title: string; content: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {isExpanded && <AccordionExpancedItem content={content} />}
    </View>
  );
};

const Accordion = () => {
  return (
    <View style={styles.container}>
      <AccordionItem title="Affidavits" content={certificateList} />
      <AccordionItem title="Certificates" content={certificateList} />
      {/* Add more AccordionItem components as needed */}
    </View>
  );
};

function CreateDocumentScreen() {
  return (
    <>
      <Accordion />
    </>
  );
}

export default CreateDocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  accordionItem: {
    backgroundColor: "white",
    width: "50%",
    padding: 20,
    gap: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  header: {},
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    fontSize: 14,
  },
});
