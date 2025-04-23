export const formatDate = (date: string): string => {
  return new Date(date).toLocaleString();
};

export const formatFuelLevel = (level: number): string => {
  return `${Math.round(level)}%`;
};

export const formatMileage = (miles: number): string => {
  return `${miles.toLocaleString()} mi`;
};