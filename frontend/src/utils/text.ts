export const truncateText = (text: string, maxLines: number = 2): string => {
  if (!text) return '';
  
  const words = text.split(' ');
  if (words.length <= maxLines * 4) return text; // Примерно 4 слова на строку
  
  return words.slice(0, maxLines * 4).join(' ') + '...';
}; 