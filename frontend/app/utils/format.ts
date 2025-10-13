export const formatDate = (dateString: string, locale = 'en-US') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const STRIP_HTML_REGEX = /<[^>]*>/g;

export const getReadingMinutesFromHtml = (
  html: string,
  wordsPerMinute = 200,
) => {
  if (!html) return 0;
  const text = html.replace(STRIP_HTML_REGEX, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (!words) return 0;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};