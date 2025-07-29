// utils/requireSponsor.js
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const requireSponsor = async (uid) => {
  if (!uid) return false;
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    const userData = userDoc.data();
    return userData && userData.role === 'sponsor';
  } catch (error) {
    console.error('Error checking sponsor permission:', error);
    return false;
  }
};
