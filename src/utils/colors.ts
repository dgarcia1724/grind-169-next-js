export const confidenceColors = {
  high: "text-green-500",
  good: "text-yellow-500",
  medium: "text-orange-500",
  low: "text-red-500"
};

export const getConfidenceColor = (rating: number): string => {
  if (rating >= 8.0) return confidenceColors.high;
  if (rating >= 6.0) return confidenceColors.good;
  if (rating >= 4.0) return confidenceColors.medium;
  return confidenceColors.low;
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'text-green-500';
    case 'medium':
      return 'text-yellow-500';
    case 'hard':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};
