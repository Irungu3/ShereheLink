import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Welcome to ShereheLink 🎉</Text>
      <View style={styles.buttonContainer}>
        <Button title="Go to Map" onPress={() => navigation.navigate('Map')} />
        <Button title="Your Profile" onPress={() => navigation.navigate('Profile')} />
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 15,
    width: '100%',
  },
});
