// screens/InboxScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const InboxScreen = () => {
  const [conversations, setConversations] = useState([]);
  const user = getAuth().currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(collection(db, 'messages'), where('to', '==', user.uid));

    const unsub = onSnapshot(q, snapshot => {
      const uniqueSenders = {};
      snapshot.forEach(doc => {
        const msg = doc.data();
        uniqueSenders[msg.from] = msg;
      });
      setConversations(Object.values(uniqueSenders));
    });

    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.from}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatCard}
            onPress={() => navigation.navigate('SponsorChatScreen', { hostId: item.from })}
          >
            <Text style={styles.sender}>From: {item.from}</Text>
            <Text numberOfLines={1}>{item.content}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  chatCard: { padding: 10, backgroundColor: '#eee', marginBottom: 8, borderRadius: 6 },
  sender: { fontWeight: 'bold' },
});

export default InboxScreen;
