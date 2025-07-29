// components/MessageBell.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const MessageBell = () => {
  const [unread, setUnread] = useState(0);
  const user = getAuth().currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('to', '==', user.uid)
    );

    const unsub = onSnapshot(q, snapshot => {
      let count = 0;
      snapshot.forEach(doc => {
        const msg = doc.data();
        if (!msg.read) count++;
      });
      setUnread(count);
    });

    return () => unsub();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('InboxScreen')}
      style={styles.bellContainer}
    >
      <Text style={styles.bell}>🔔</Text>
      {unread > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bellContainer: { position: 'relative', padding: 8 },
  bell: { fontSize: 24 },
  badge: {
    position: 'absolute', top: 0, right: 0,
    backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 6,
  },
  badgeText: { color: '#fff', fontSize: 12 },
});

export default MessageBell;
