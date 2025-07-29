// utils/isVerified.js
export const isVerifiedHost = (vibeScore, reports) => {
  return vibeScore >= 300 && reports === 0;
};

