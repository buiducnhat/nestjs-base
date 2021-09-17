export default (): Record<string, string> => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtShortExpiresIn: process.env.JWT_SHORT_EXPIRES_IN || '1d',
  jwtLongExpiresIn: process.env.JWT_LONG_EXPIRES_IN || '30d',
});
