import React, { useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AccordionItem = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity onPress={toggleAccordion}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text>{isExpanded ? "[-]" : "[+]"}</Text>
        </View>
      </TouchableOpacity>
      {isExpanded && <Text style={styles.content}>{content}</Text>}
    </View>
  );
};

const Accordion = () => {
  return (
    <View style={styles.container}>
      <AccordionItem title="Section 1" content="Content for section 1." />
      <AccordionItem title="Section 2" content="Content for section 2." />
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
    padding: 16,
    marginTop: Platform.OS === "web" ? 16 : 0,
  },
  accordionItem: {
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 8,
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    padding: 8,
    backgroundColor: "#e0e0e0",
  },
});
