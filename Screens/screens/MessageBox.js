// components/MessageBox.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { addDoc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';

const MessageBox = ({ recipientId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const user = getAuth().currentUser;

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('participants', 'array-contains', user.uid),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          (data.from === user.uid && data.to === recipientId) ||
          (data.from === recipientId && data.to === user.uid)
        ) {
          msgs.push({ id: doc.id, ...data });
        }
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [recipientId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    await addDoc(collection(db, 'messages'), {
      from: user.uid,
      to: recipientId,
      participants: [user.uid, recipientId],
      content: message.trim(),
      timestamp: Date.now(),
    });

    setMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={styles.message}>
            <Text style={{ fontWeight: 'bold' }}>
              {item.from === user.uid ? 'Me' : 'Them'}:
            </Text> {item.content}
          </Text>
        )}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        style={styles.input}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  message: { padding: 6, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default MessageBox;
