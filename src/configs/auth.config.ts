export default (): Record<string, any> => ({
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtAlgorithm: 'HS256',
  jwtShortExpiresIn: process.env.JWT_SHORT_EXPIRES_IN || '1d',
  jwtLongExpiresIn: process.env.JWT_LONG_EXPIRES_IN || '30d',
});
