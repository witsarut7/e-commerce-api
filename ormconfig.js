const path = require('path');
const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;

require('dotenv').config();

function env(key) {
  return process.env[key];
}

const baseConfig = {
  type: env('DB_CONNECTION'),
  database: env('DB_DATABASE'),
  host: env('DB_HOST'),
  port: env('DB_PORT'),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  logging: ['warn', 'error'],
  namingStrategy: new SnakeNamingStrategy(),
  entities: [path.join('dist', 'database', 'entities', '*.entity{.ts,.js}')],
  migrations: [path.join('dist', 'database', 'migrations', '*{.ts,.js}')],
  cli: {
    migrationsDir: path.join('src', 'database', 'migrations')
  },
  seeds: [path.join('dist', 'database', 'seeds', '*{.ts,.js}')],
};

module.exports = {
  dropSchema: env('DB_DROP_SCHEMA') === 'true',
  synchronize: env('DB_SYNCHRONIZE') === 'true',
  ...baseConfig
};
