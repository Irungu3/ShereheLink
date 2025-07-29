export const getHostTier = (vibeScore) => {
  if (vibeScore >= 500) return { tier: 'Platinum', color: '#e5e4e2', icon: '👑' };
  if (vibeScore >= 300) return { tier: 'Gold', color: '#ffd700', icon: '🏆' };
  if (vibeScore >= 150) return { tier: 'Silver', color: '#c0c0c0', icon: '🥈' };
  if (vibeScore >= 50) return { tier: 'Bronze', color: '#cd7f32', icon: '🥉' };
  return { tier: 'Newbie', color: '#808080', icon: '🔰' };
};

export const isVerifiedHost = (vibeScore, reports) => {
  return vibeScore >= 300 && reports === 0;
};

