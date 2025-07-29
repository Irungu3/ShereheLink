// screens/SponsorChatScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MessageBox from '../components/MessageBox';

const SponsorChatScreen = ({ route }) => {
  const { hostId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat with Host</Text>
      <MessageBox recipientId={hostId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 20, fontWeight: 'bold', padding: 10 },
});

export default SponsorChatScreen;
