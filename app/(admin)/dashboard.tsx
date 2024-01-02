import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, TextInput } from 'react-native';
import initialFaqs from '../../assets/json/faq.json';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQComponent: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [newAnswer, setNewAnswer] = useState<string>('');

  const handleUpdate = (question: string) => {
    const updatedFaqs = faqs.map(faq => {
      if (faq.question === question) {
        return { ...faq, answer: newAnswer };
      }
      return faq;
    });

    setFaqs(updatedFaqs);
    setEditingQuestion(null);
    setNewAnswer('');
  };

  const handleDelete = (question: string) => {
    const updatedFaqs = faqs.filter(faq => faq.question !== question);
    setFaqs(updatedFaqs);
  };

  const renderItem = ({ item, index }: { item: FAQItem; index: number }) => (
    <View style={styles.faqItem}>
      <Text style={styles.question}>Q.{index + 1} {item.question}</Text>
      {editingQuestion === item.question ? (
        <>
          <TextInput
            style={styles.input}
            value={newAnswer}
            onChangeText={setNewAnswer}
            placeholder="Enter new answer"
          />
          <Button title="Save" onPress={() => handleUpdate(item.question)} />
        </>
      ) : (
        <Text style={styles.answer}>Ans. {item.answer}</Text>
      )}
      <View style={styles.buttons}>
        <Button title="Edit" onPress={() => {
          setEditingQuestion(item.question);
          setNewAnswer(item.answer);
        }} />
        <Button title="Delete" onPress={() => handleDelete(item.question)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={faqs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  faqItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  question: {
    fontWeight: 'bold',
  },
  answer: {
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default FAQComponent;
