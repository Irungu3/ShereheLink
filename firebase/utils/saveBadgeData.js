// utils/saveBadgeData.js
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getHostTier, isVerifiedHost } from './getHostTier';

export const saveBadgeData = async (userId, vibeScore, reports) => {
  const { tier, icon, color } = getHostTier(vibeScore);
  const verified = isVerifiedHost(vibeScore, reports);

  try {
    await setDoc(doc(db, 'users', userId), {
      vibeScore,
      reports,
      hostTier: tier,
      hostTierIcon: icon,
      hostTierColor: color,
      isVerified: verified,
    }, { merge: true });

    console.log('Badge data saved successfully');
  } catch (error) {
    console.error('Error saving badge data:', error);
  }
};
