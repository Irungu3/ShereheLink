import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const doc = await db.collection('users').doc(user.uid).get();
      if (doc.exists) {
        setUserData(doc.data());
      }
    };

    fetchUser();
  }, []);

  if (!userData) return <Text>Loading profile...</Text>;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: userData.photoURL || 'https://i.pravatar.cc/150?img=12' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{userData.name || 'Unnamed User'}</Text>
      <Text style={styles.bio}>{userData.bio || 'No bio yet.'}</Text>
      <Text style={styles.score}>🔥 Vibe Score: {userData.vibeScore || 0}</Text>
      <Text style={styles.stats}>
        👥 {userData.followers?.length || 0} followers · {userData.following?.length || 0} following
      </Text>
      <Text style={styles.badge}>🏆 Host Tier: {userData.hostTier || 'None'}</Text>
      <Button title="Edit Profile (Coming Soon)" disabled />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 40 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  name: { fontSize: 24, fontWeight: 'bold' },
  bio: { fontSize: 16, fontStyle: 'italic', color: 'gray', marginBottom: 10 },
  score: { fontSize: 18, marginTop: 10 },
  stats: { fontSize: 16, marginTop: 5 },
  badge: { fontSize: 16, color: '#d4af37', marginTop: 5 },
});
