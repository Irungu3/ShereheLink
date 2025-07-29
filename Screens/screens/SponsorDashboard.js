// screens/SponsorDashboard.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Picker,
  Dimensions,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { BarChart } from 'react-native-chart-kit';
import { getAuth } from 'firebase/auth';
import { requireSponsor } from '../utils/requireSponsor';
import * as Notifications from 'expo-notifications';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  style: { borderRadius: 16 },
};

const SponsorDashboard = ({ navigation }) => {
  const [hosts, setHosts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const checkAndFetch = async () => {
      const user = getAuth().currentUser;
      const isSponsor = await requireSponsor(user?.uid);
      if (!isSponsor) {
        Alert.alert('Access Denied', 'You must be a sponsor to access this page.');
        navigation.goBack();
        return;
      }

      const snapshot = await getDocs(collection(db, 'users'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHosts(data);
    };

    checkAndFetch();
  }, []);

  const filteredHosts = hosts.filter(h =>
    filter === 'all' ? true : h.hostTier === filter
  );

  const sendDeal = async (host) => {
    try {
      const message = {
        to: host.notificationToken || '',
        sound: 'default',
        title: 'New Deal Offer',
        body: `You have a new deal offer from a sponsor!`,
        data: { type: 'deal', from: getAuth().currentUser.uid },
      };

      if (host.notificationToken) {
        await Notifications.scheduleNotificationAsync({
          content: message,
          trigger: null,
        });
        Alert.alert('Deal Sent', `Deal offer sent to ${host.displayName}`);
      } else {
        Alert.alert('No Token', `${host.displayName} has no push token`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send deal');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sponsor Dashboard</Text>
      <Picker selectedValue={filter} onValueChange={(val) => setFilter(val)}>
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Platinum" value="Platinum" />
        <Picker.Item label="Gold" value="Gold" />
        <Picker.Item label="Silver" value="Silver" />
        <Picker.Item label="Bronze" value="Bronze" />
      </Picker>

      {filteredHosts.length > 0 && (
        <BarChart
          data={{
            labels: filteredHosts.map(h => h.displayName.slice(0, 6)),
            datasets: [{ data: filteredHosts.map(h => h.vibeScore || 0) }],
          }}
          width={screenWidth - 20}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          style={{ marginBottom: 16, borderRadius: 8 }}
        />
      )}

      <FlatList
        data={filteredHosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.displayName}</Text>
            <Text>Tier: {item.hostTier}</Text>
            <Text>Vibe Score: {item.vibeScore}</Text>

            <TouchableOpacity
              style={styles.dealButton}
              onPress={() => sendDeal(item)}
            >
              <Text style={styles.dealText}>Send Deal</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  name: { fontSize: 18, fontWeight: '600' },
  dealButton: {
    marginTop: 8,
    backgroundColor: '#2196f3',
    padding: 8,
    borderRadius: 6,
  },
  dealText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default SponsorDashboard;









