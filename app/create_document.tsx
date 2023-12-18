import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/native/Button";
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
        name: "name and address of the Applicant",
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
      {
        name: "Registered at",
        formatName: "registered_at",
      },
      {
        name: "Registered under the Act",
        formatName: "registered_under_act",
      },
      {
        name: "Competent Authority",
        formatName: "competent_authority",
      },
      {
        name: "Sl. No.",
        formatName: "sl_no",
      },
      {
        name: "name of the Deed Document No",
        formatName: "name_of_deed",
      },
      {
        name: "Document No.",
        formatName: "doc_no",
      },
      {
        name: "Survey No",
        formatName: "survey_no",
      },
      {
        name: "Registration No. and Date",
        formatName: "reg_no_and_date",
      },
      {
        name: "Land Area in Acre",
        formatName: "land_area",
      },
      {
        name: "Letter No.",
        formatName: "letter_no",
      },
      {
        name: "Letter dated",
        formatName: "letter_date",
      },
      {
        name: "Issued By",
        formatName: "issued_by",
      },
      {
        name: "Extent of Land (in acre)",
        formatName: "extent_of_land",
      },
      {
        name: "Land Classication",
        formatName: "land_classification",
      },
    ],
  },
  {
    name: "Certificate of an Architect registered with Council of Architecture",
    path: require("../assets/pdf/certificates/certificate_of_an_architect.pdf"),
    field: [
      {
        name: "<name and address of the Applicant>",
        formatName: "text_20kcwd",
      },
      {
        name: "Institution<name of the Institutions>",
        formatName: "text_21fjwt",
      },
      {
        name: "<address>",
        formatName: "text_22vqxh",
      },
      {
        name: "<name and address of the Applicant>",
        formatName: "text_23akth",
      },
      {
        name: "Plans approved by",
        formatName: "text_2hbpu",
      },
      {
        name: "Approval Number",
        formatName: "text_3deri",
      },
      {
        name: "Date of Approval",
        formatName: "text_4xqrc",
      },
      {
        name: "Sl.No.",
        formatName: "text_5qszp",
      },
      {
        name: "Room No",
        formatName: "text_6mwnw",
      },
      {
        name: "Room type (mention Class Room/ Laboratory/ Toilet, etc.)",
        formatName: "text_7clqm",
      },
      {
        name: "Carpet area (in m2)",
        formatName: "text_10gjpx",
      },
      {
        name: "Completion of Flooring",
        formatName: "text_11pfzd",
      },
      {
        name: "Completion of Walls and painting",
        formatName: "text_9krqb",
      },
      {
        name: "Completion of Electrification and lighting",
        formatName: "text_8nnlv",
      },
      {
        name: "Certificate approved by",
        formatName: "text_12wikx",
      },
      {
        name: "Approval Number",
        formatName: "text_13cbqd",
      },
      {
        name: "Date of Approval",
        formatName: "text_14tgwl",
      },
      {
        name: "Certificate approved by",
        formatName: "text_15vrur",
      },
      {
        name: "Approval Number",
        formatName: "text_16ggvf",
      },
      {
        name: "Date of Approval",
        formatName: "text_17jwq",
      },
    ],
  },
  {
    name: "Certificate of the Bank Manager where the Applicant has a Bank Account",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
];

const affidavitsList = [
  {
    name: "Format for Forgotten Password",
    path: require("../assets/pdf/affidavits/format_of_forgotten_password.pdf"),
    field: [
      {
        name: " <name>",
        formatName: "text_1onzw",
      },
      {
        name: " <name of the Trust/ Society/ Company>",
        formatName: "text_2yagy",
      },
      {
        name: "son/ daughter of",
        formatName: "text_3savj",
      },
      {
        name: "aged",
        formatName: "text_4ghsf",
      },
      {
        name: "resident of",
        formatName: "text_5hxxb",
      },
      {
        name: " <name and address of Institution>",
        formatName: "text_6bxqj",
      },
      {
        name: " <user ID>",
        formatName: "text_7sell",
      },

      {
        name: "<name>",
        formatName: "text_8saud",
      },
      {
        name: "<name of the Trust/ Society/ Company>",
        formatName: "text_9qaco",
      },
      {
        name: "<name>",
        formatName: "text_10zkpa",
      },
      {
        name: "<name of the Trust/ Society/ Company>",
        formatName: "text_11zvob",
      },
      {
        name: "transaction id",
        formatName: "text_12btim",
      },
      {
        name: "  transaction date",
        formatName: "text_13mxku",
      },

      {
        name: " <name of the Person>",
        formatName: "text_14qyjy",
      },
      {
        name: "<Address>",
        formatName: "text_15cudv",
      },
      {
        name: "<Landline No>",
        formatName: "text_16sqpq",
      },
      {
        name: "<Mobile No>",
        formatName: "text_17hjbv",
      },
      {
        name: " <email id>",
        formatName: "text_18hipi",
      },
      {
        name: "<name of the place>",
        formatName: "text_19psvx",
      },
      {
        name: "<date>",
        formatName: "text_20mufa",
      },
      {
        name: "day/months/year",
        formatName: "text_21nuar",
      },
    ],
  },
  {
    name: "Format for the applications submitted under Chapter I/ II/ IV except Closure of the Institution",
    path: require("../assets/pdf/affidavits/format_of_application_submitted.pdf"),
    field: [
      {
        name: "<name>",
        formatName: "text_1ulyu",
      },
      {
        name: "<name of the Trust/ Society/ Company>",
        formatName: "text_3bycy",
      },
      {
        name: " son / daughter of",
        formatName: "text_5peb",
      },
      {
        name: "aged",
        formatName: "text_6kfpb",
      },
      {
        name: "resident of",
        formatName: "text_7mcj",
      },
      {
        name: "application dated",
        formatName: "text_8sngb",
      },
      {
        name: "<name(s)>",
        formatName: "text_9zcmg",
      },
      {
        name: "name of the Institution",
        formatName: "text_10tnha",
      },
      {
        name: "Programmes/ Courses offered",
        formatName: "text_11xzsc",
      },
      {
        name: "Built-Up Area",
        formatName: "text_13wniz",
      },
      {
        name: "Approved by AICTE or Not",
        formatName: "text_12jldq",
      },
      {
        name: "< name of the Institution>",
        formatName: "text_14gect",
      },
      {
        name: "<name(s)>",
        formatName: "text_15qmdf",
      },
      {
        name: "<name(s)>",
        formatName: "text_16ppgm",
      },
      {
        name: "<name of the Trust/Society/Company/Technical Institution>",
        formatName: "text_18ei",
      },
      {
        name: "<name of the Trust/Society/Company/Technical Institution>",
        formatName: "text_20vmg",
      },
      {
        name: "<name of the Trust/Society/Company/Technical Institution>",
        formatName: "text_21dshe",
      },
      {
        name: "<name of the Trust/Society/Company/Technical Institution>",
        formatName: "text_22pjpw",
      },
      {
        name: " <application number>",
        formatName: "text_23ibzw",
      },
      {
        name: "<name and address of Institution>",
        formatName: "text_24ypxv",
      },
      {
        name: " <application number>",
        formatName: "text_25sdeh",
      },
      {
        name: "<name and address of Institution>",
        formatName: "text_26svwv",
      },
      {
        name: " <name of the place>",
        formatName: "text_27sgzk",
      },
      {
        name: " <date>",
        formatName: "text_28mjhj",
      },
    ],
  },
  {
    name: "Format for the establishment of a new Technical Institution while submitting the Security Deposit",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
  {
    name: "Format for the Progressive/ Complete Closure of the Institution",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
  {
    name: "Format for Category I/ II Universities notified by the UGC for the compliance of AICTE norms",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
  {
    name: " Format for the release of Security Deposit",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
  {
    name: "Format of the Joint Affidavit by the Lessor and Lessee for transfer of private Property/ Building under the Transfer of Property Act, 1882",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
  {
    name: "Format for Additional Course(s) / Increase in Intake",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
  {
    name: "Format for Change in the name of the Bank",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
  {
    name: "Format for Change in the name of the Trust/ Society/ Company",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
  {
    name: "Format for Collaboration and Twinning Programme between Foreign University/ Institution OR Institute of National Importance /Eminence of India and AICTE Approved Institution",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
  {
    name: "Format for conducting Academic Course(s) of other Regulatory Body",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
  {
    name: "Format for conducting Open and Distance Learning & Online Courses",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
];

const formatList = [
  {
    name: "No Objection Certificate from State Government/ UT",
    path: require("../assets/pdf/formats/noc_form_state_gov.pdf"),
    field: [
      {
        name: "<name of the Trust/Society/Company>",
        formatName: "text_1swup",
      },
      {
        name: "Executive meeting held",
        formatName: "text_2sqoy",
      },
      {
        name: " <name of the Institution>",
        formatName: "text_3zras",
      },
      {
        name: "<address>",
        formatName: "text_4wzya",
      },
      {
        name: "<name \nof the Institution>",
        formatName: "text_5idqs",
      },
      {
        name: "<address>",
        formatName: "text_6yxoo",
      },
      {
        name: "<Course1…..(Intake)>",
        formatName: "text_7jvjo",
      },
      {
        name: " <name of the present Trust/ Society/Company >",
        formatName: "text_8jyac",
      },
      {
        name: "<address>",
        formatName: "text_9csxc",
      },
      {
        name: " <name of the new Trust/ Society/ Company >",
        formatName: "text_10oqlm",
      },
      {
        name: "<address>",
        formatName: "text_11krrq",
      },
      {
        name: "<name of the Institution>",
        formatName: "text_12nmgp",
      },
      {
        name: "<address>",
        formatName: "text_13umqs",
      },
      {
        name: "application ref.no.",
        formatName: "text_14qfaq",
      },
      {
        name: "company name",
        formatName: "text_15xbkj",
      },
      {
        name: "Address at",
        formatName: "text_16pfby",
      },
      {
        name: " <State Government/UT>",
        formatName: "text_17lyk",
      },
      {
        name: "<name of the Institution>",
        formatName: "text_18qfom",
      },
      {
        name: "<address>",
        formatName: "text_19hlxx",
      },
      {
        name: "<name of the Institution>",
        formatName: "text_20sfsi",
      },
      {
        name: "<address>",
        formatName: "text_21amcr",
      },
      {
        name: " <Course1…..(Intake)>",
        formatName: "text_22qlms",
      },
      {
        name: "<name of the present Trust/ Society/ Company>",
        formatName: "text_23tgit",
      },
      {
        name: "<address>",
        formatName: "text_24qrsn",
      },
      {
        name: " <name of the new Trust/ Society/ Company >",
        formatName: "text_25uhuu",
      },
      {
        name: "<address>",
        formatName: "text_26dtkt",
      },
      {
        name: " <name of the Institution> ",
        formatName: "text_27aqpx",
      },
      {
        name: " <address>",
        formatName: "text_28gwta",
      },
      {
        name: " <State Government/ UT>",
        formatName: "text_29ybeo",
      },
    ],
  },
  {
    name: "No Objection Certificate from affiliating University/ Board",
    path: require("../assets/pdf/formats/noc_from_affiliating_unv.pdf"),
    field: [
      {
        name: " <Name of the Trust/ Society / Company>",
        formatName: "text_1zicz",
      },
      {
        name: "Executive meeting held on",
        formatName: "text_2dlcp",
      },
      {
        name: "Executive meeting held at",
        formatName: "text_3rrpt",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_4fkqm",
      },
      {
        name: "<address>",
        formatName: "text_5kzxf",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_6efyj",
      },
      {
        name: "<address>",
        formatName: "text_7ecwt",
      },
      {
        name: "<Course1…..(Intake)>",
        formatName: "text_8wuka",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_9ahfx",
      },
      {
        name: "<address>",
        formatName: "text_10rgkm",
      },
      {
        name: "<Name of the Institution(s)>",
        formatName: "text_12cqdc",
      },
      {
        name: "<address>",
        formatName: "text_13aymx",
      },
      {
        name: " <Name of the Course>",
        formatName: "text_14cnks",
      },
      {
        name: " <Name of the Course>",
        formatName: "text_15rqcq",
      },
      {
        name: " <Name of the Course>",
        formatName: "text_16gtcg",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_17kmoc",
      },
      {
        name: "<address>",
        formatName: "text_18koib",
      },
      {
        name: "<Name of the University>",
        formatName: "text_19hpiu",
      },
      {
        name: "<address>",
        formatName: "text_20fvzj",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_21trlk",
      },
      {
        name: "<address>",
        formatName: "text_23aupi",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_24phku",
      },
      {
        name: "<address>",
        formatName: "text_25pxa",
      },
      {
        name: " <Name of the present University/ Board>",
        formatName: "text_26mgsv",
      },
      {
        name: "<address>",
        formatName: "text_27dllc",
      },
      {
        name: " <Name of the new University/ Board>",
        formatName: "text_28sncj",
      },
      {
        name: "<address>",
        formatName: "text_29kbce",
      },
      {
        name: "<Name of the present Trust>",
        formatName: "text_30hedz",
      },
      {
        name: "<address>",
        formatName: "text_31hkdq",
      },
      {
        name: "<Name of the new \nTrust>",
        formatName: "text_32wvde",
      },
      {
        name: "<address>",
        formatName: "text_33estg",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_34amfu",
      },
      {
        name: "<address>",
        formatName: "text_35bryb",
      },
      {
        name: "Application ref. no.",
        formatName: "text_36rfsl",
      },
      {
        name: "Date",
        formatName: "text_37xlwm",
      },
      {
        name: "Company name",
        formatName: "text_38cbhh",
      },
      {
        name: "Address as at",
        formatName: "text_39jimi",
      },
      null,
      {
        name: "<affiliating University/Board>",
        formatName: "text_40qmxg",
      },
      {
        name: "Confirm ",
        formatName: "text_41uklp",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_42zyl",
      },
      {
        name: "<address>",
        formatName: "text_43vwoz",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_44pvuz",
      },
      {
        name: "<address>",
        formatName: "text_45oipj",
      },
      {
        name: "<Course1….. (Intake…..)>",
        formatName: "text_46tchv",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_47faht",
      },
      {
        name: "<address>",
        formatName: "text_48oiui",
      },
      {
        name: "<Name of the Institution(s)>",
        formatName: "text_49dhpv",
      },
      {
        name: "<address>",
        formatName: "text_50hbmb",
      },
      {
        name: " <Name of the Course>",
        formatName: "text_51ijxh",
      },
      {
        name: " <Name of the Course>",
        formatName: "text_52ezpo",
      },
      {
        name: "<Course1….. (Intake…..), Course2 …..(Intake…..),>",
        formatName: "text_53sbet",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_54fauf",
      },
      {
        name: "<address>",
        formatName: "text_55sgpx",
      },
      {
        name: "<Name of the University>",
        formatName: "text_56ydqn",
      },
      {
        name: "<address>",
        formatName: "text_58iyvi",
      },
      {
        name: "course requested for closure",
        formatName: "text_59xnmh",
      },
      {
        name: "no. of current students",
        formatName: "text_60dvjm",
      },
      {
        name: " no.of students admitted in these coursesin the previous years      ",
        formatName: "text_61yxlf",
      },
      {
        name: "details about re arrangements of students",
        formatName: "text_62cbh",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_63kmdj",
      },
      {
        name: "<address>",
        formatName: "text_64ytyg",
      },
      {
        name: " <Name of the Institution>",
        formatName: "text_65uib",
      },
      {
        name: "<address>",
        formatName: "text_66njdp",
      },
      {
        name: "<Name of the present University/Board>",
        formatName: "text_67dciu",
      },
      {
        name: "<address>",
        formatName: "text_68vzk",
      },
      {
        name: "<Name of the new University/Board>",
        formatName: "text_69quyt",
      },
      {
        name: "<address>",
        formatName: "text_70nmdn",
      },
      {
        name: " <Name of the present Trust>",
        formatName: "text_71mfio",
      },
      {
        name: "<address>",
        formatName: "text_72yqfm",
      },
      {
        name: " <Name of the newTrust>",
        formatName: "text_73emij",
      },
      {
        name: "<address>",
        formatName: "text_74btng",
      },
      {
        name: "<Name of the Institution>",
        formatName: "text_75ahik",
      },
      {
        name: "<address>",
        formatName: "text_76bkb",
      },
      {
        name: "<affiliating University/Board>",
        formatName: "text_77qjiw",
      },
    ],
  },
  {
    name: "Resolution of the Trust/ Society/ Company",
    path: require("../assets/pdf/certificates/certificate_of_advocate.pdf"),
  },
  {
    name: "MoU to be signed between the Institution and Skill Knowledge Providers/Trainers",
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
      {isExpanded ? <AccordionExpancedItem content={content} /> : null}
    </View>
  );
};

const Accordion = () => {
  return (
    <View style={styles.container}>
      <AccordionItem title="Affidavits" content={affidavitsList} />
      <AccordionItem title="Certificates" content={certificateList} />
      <AccordionItem title="Formats" content={formatList} />
    </View>
  );
};

function CreateDocumentScreen() {
  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 50 }}>
      <Accordion />
    </ScrollView>
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
