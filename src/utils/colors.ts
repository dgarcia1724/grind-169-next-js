export const confidenceColors = {
  high: "text-green-500",
  good: "text-yellow-500",
  medium: "text-orange-500",
  low: "text-red-500"
};

export const getConfidenceColor = (rating: number): string => {
  const numericRating = Number(rating);
  
  if (numericRating >= 8.0) return confidenceColors.high;
  if (numericRating >= 6.0) return confidenceColors.good;
  if (numericRating >= 4.0) return confidenceColors.medium;
  return confidenceColors.low;
};

export const getDifficultyColor = (difficulty: string): string => {
  const normalizedDifficulty = difficulty?.toLowerCase()?.trim() || '';
  
  switch (normalizedDifficulty) {
    case 'easy':
      return 'text-green-500';
    case 'medium':
      return 'text-yellow-500';
    case 'hard':
      return 'text-red-500';
    default:
      console.log('Unmatched difficulty:', difficulty);
      return 'text-gray-500';
  }
};
