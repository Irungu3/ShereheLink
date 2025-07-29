import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VerifiedBadge = () => (
  <View style={styles.badge}>
    <Text style={styles.icon}>✔️</Text>
    <Text style={styles.text}>Verified</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    padding: 6,
    borderRadius: 8,
    marginLeft: 10,
  },
  icon: {
    fontSize: 16,
    marginRight: 4,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VerifiedBadge;



