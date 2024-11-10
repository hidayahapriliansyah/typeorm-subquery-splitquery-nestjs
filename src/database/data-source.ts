import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'learn_subquery_typeorm',
  entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/../**/database/migrations/*{.ts,.js}`],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
