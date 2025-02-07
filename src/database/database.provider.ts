import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from 'src/core/constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize({
        ...config,
        dialect: config.dialect,
        models: [__dirname + '/models'],
        pool: {
          max: 5,
          min: 0,
        },
        logging: false, // process.env.NODE_ENV !== ENVIRONMENT.TEST,
        repositoryMode: false,
      });
      return sequelize;
    },
  },
];
