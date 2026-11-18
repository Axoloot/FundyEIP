const getFlag = (countryCode: string): string => {
  if (countryCode === 'en') return getFlag('GB');
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default getFlag;
