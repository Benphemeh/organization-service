import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from 'src/core/constants';
import { databaseConfig } from './database.config';
import Organization from './models/organization.model';

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
        models: [__dirname + '/models'],
        dialectOptions: {
          useUTC: true,
        },
        timezone: '+01:00',
        logging: false,
      });
      return sequelize;
    },
  },
];
