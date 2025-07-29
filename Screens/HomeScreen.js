import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Welcome to ShereheLink!</Text>
      <Text style={styles.subtitle}>Logged in as: {userEmail}</Text>

      <View style={styles.navSection}>
        <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
        <Button title="Explore Map" onPress={() => navigation.navigate('Map')} />
        <Button title="Host Dashboard" onPress={() => navigation.navigate('HostDashboard')} />
        <Button title="Sponsor Dashboard" onPress={() => navigation.navigate('SponsorDashboard')} />
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center'
  },
  navSection: {
    gap: 10
  }
});
