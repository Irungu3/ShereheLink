import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getHostTier, isVerifiedHost } from '../utils/getHostTier';
import VerifiedBadge from './VerifiedBadge';

const HostBadge = ({ vibeScore, reports }) => {
  const { tier, color, icon } = getHostTier(vibeScore);
  const verified = isVerifiedHost(vibeScore, reports);

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: color }]}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.text}>{tier} Host</Text>
      </View>
      {verified && <VerifiedBadge />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  icon: {
    fontSize: 18,
    marginRight: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default HostBadge;




