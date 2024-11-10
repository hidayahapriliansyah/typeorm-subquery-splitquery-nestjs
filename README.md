# 🐱‍💻 NestJS Project for SplitQuery and SubQuery with TypeORM

This is a **NestJS** project to test **SplitQuery** and **SubQuery** techniques using **TypeORM** with **MySQL**. It demonstrates how to retrieve data using two different query strategies in NestJS. You can test both query techniques, explore the database structure, and see the performance difference.

## 🚀 Prerequisites

Make sure you have the following installed on your local machine:

- **Node.js** v20.11.1 (check with `node -v`)
- **MySQL** database server

## 🧑‍💻 Setup Instructions

### 1. Configure Your Database

Before running the project, you need to configure your database connection.

- Open `src/database/data-source.ts`. (Sorry for the inconvenience, but I’ve skipped creating an .env file for simplicity in this setup. 😅 Don’t worry, you’re still good to go!)
- Modify the database, username, and password according to your environment.

Here's the default code for **MySQL** connection:

```ts
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'learn_subquery_typeorm',  // Change this to your database name
  entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/../**/database/migrations/*{.ts,.js}`],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
```

### 2. Run Database Migrations

Once your database is configured, run the migrations to apply the schema to the database:

```bash
npm run migration:run
```

This will apply the necessary migrations defined in your project.

### 3. Run Seeder to Populate Data

Next, you need to seed the database with 100 users, each having 100 chat messages. You can run the seed script with:

```bash
npm run seed
```

This will create the data you need for testing the SplitQuery and SubQuery endpoints.

### 4. Run the Tests

You don't need to run the server with `npm run start:dev` because the project is using **Supertest** for end-to-end testing. You can directly run the tests by executing:

```bash
npm run test:e2e
```

This command will automatically start the tests and you will see the results in your terminal console. It checks the validity of the **SplitQuery** and **SubQuery** endpoints by making requests to the routes and validating their responses.

## 🛠️ Tools and Libraries Used

- **NestJS** - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM** - An ORM for TypeScript and JavaScript (ES7, ES6, ES5).
- **MySQL** - Relational database management system.
- **Jest** - A delightful JavaScript testing framework with a focus on simplicity.
- **Supertest** - A popular HTTP assertion library for testing HTTP servers.

## 📄 License

This project is licensed under the MIT License.

---

If you have any issues or questions, feel free to open an issue or reach out. Happy coding! 👨‍💻👩‍💻

