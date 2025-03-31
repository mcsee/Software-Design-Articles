function validateURL(url) {
  const urlRegex =
    /^(https?:\/\/)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/.*)?$/;
  // Criptic and untesteable
  return urlRegex.test(url);
}