import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import HostBadge from '../components/HostBadge';

<HostBadge vibeScore={user.vibeScore} />


const ProfileScreen = () => {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [vibeScore, setVibeScore] = useState(0);
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setBio(data.bio || '');
          setVibeScore(data.vibeScore || 0);
          setPhotoURL(data.photoURL || '');
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        name,
        bio,
        photoURL,
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile: ' + error.message);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Image source={{ uri: photoURL || 'https://via.placeholder.com/150' }} style={styles.image} />
      <TextInput
        placeholder="Profile Photo URL"
        style={styles.input}
        value={photoURL}
        onChangeText={setPhotoURL}
      />
      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Bio" style={styles.input} value={bio} onChangeText={setBio} multiline />
      <Text style={styles.vibe}>🔥 Vibe Score: {vibeScore}</Text>
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  vibe: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#ff4c68',
  },
});

export default ProfileScreen;
