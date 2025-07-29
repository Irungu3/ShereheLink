import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebaseConfig';
import firebase from 'firebase/app';

export default function CreateEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleCreateEvent = async () => {
    if (!title || !description || !location) {
      Alert.alert('Please fill out all fields');
      return;
    }

    try {
      await db.collection('events').add({
        title,
        description,
        location,
        createdBy: auth.currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Event created successfully!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error creating event:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Host a New Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Description"
        onChangeText={setDescription}
        value={description}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Location"
        onChangeText={setLocation}
        value={location}
      />
      <Button title="Create Event" onPress={handleCreateEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
  },
});
