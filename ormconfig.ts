export = {
  host: 'localhost',
  type: 'mysql',
  port: 3306,
  username: 'gerpan',
  password: 'Buiducnhat4701@',
  database: 'test',
  entities: ['src/modules/**/entities/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
