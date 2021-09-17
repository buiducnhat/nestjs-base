export default (): Record<string, any> => ({
  dbType: process.env.DB_TYPE || 'mysql',
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT, 10) || 3306,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_DB_NAME,
});
