import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Button, Alert } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import HostBadge from '../components/HostBadge';
import { getHostTier, isVerifiedHost } from '../utils/getHostTier';

const ProfileScreen = () => {
  const [vibeScore, setVibeScore] = useState(null);
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = 'user123'; // Replace with actual logged-in user ID

  const fetchUserData = async () => {
    try {
      const docRef = doc(db, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setVibeScore(data.vibeScore || 0);
        setReports(data.reports || 0);
      } else {
        console.warn('No user data found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const increaseVibeScore = async () => {
    try {
      const newScore = vibeScore + 50;
      const tierData = getHostTier(newScore);
      const verified = isVerifiedHost(newScore, reports);

      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, {
        vibeScore: newScore,
        hostTier: tierData.tier,
        isVerified: verified,
      });

      setVibeScore(newScore);
      Alert.alert('Vibe Score Updated', `New score: ${newScore}`);
    } catch (error) {
      console.error('Error updating vibe score:', error);
      Alert.alert('Update Failed', 'Could not update score.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/user-profile.jpg' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Jane Doe</Text>
      <HostBadge vibeScore={vibeScore} reports={reports} />
      <Button title="Add 50 Vibe Score" onPress={increaseVibeScore} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;







