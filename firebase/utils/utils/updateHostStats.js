import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getHostTier, isVerifiedHost } from './getHostTier';

export const updateHostStats = async (hostId, boost = 10) => {
  try {
    const userRef = doc(db, 'users', hostId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.warn('Host user not found');
      return;
    }

    const prevData = userSnap.data();
    const newScore = (prevData.vibeScore || 0) + boost;
    const reports = prevData.reports || 0;

    const { tier } = getHostTier(newScore);
    const verified = isVerifiedHost(newScore, reports);

    await updateDoc(userRef, {
      vibeScore: newScore,
      hostTier: tier,
      isVerified: verified,
    });

    console.log('Host stats updated!');
  } catch (error) {
    console.error('Error updating host stats:', error);
  }
};
