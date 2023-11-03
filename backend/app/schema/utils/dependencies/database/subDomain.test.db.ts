import { Sequelize } from "sequelize-typescript"
import { Umzug, SequelizeStorage } from "umzug"
import glob from "glob"

let subDomainDb;

const config = {
  HOST: process.env.POSTGRES_SUBDOMAIN_TEST_HOST,
  USER: process.env.POSTGRES_SUBDOMAIN_TEST_USER,
  PASSWORD: process.env.POSTGRES_SUBDOMAIN_TEST_PASSWORD,
  DB: process.env.POSTGRES_SUBDOMAIN_TEST_DB,
  dialect: "postgres",
  pool: {
    max: parseInt(process.env.POSTGRES_SUBDOMAIN_TEST_POOL_MAX),
    min: parseInt(process.env.POSTGRES_SUBDOMAIN_TEST_POOL_MIN),
    // acquire: parseInt(process.env.POSTGRES_TEST_POOL_ACQUIRE),
    idle: parseInt(process.env.POSTGRES_SUBDOMAIN_TEST_POOL_IDLE)
  }
}

export default async function connectToSubDomainTestDb(): Promise<Sequelize> {

  if (subDomainDb) {
    return subDomainDb
  }

  // Grad all files to build database
  let dbResolvers = [
    ...glob.sync(`${__dirname}/../../../../models/subDomain/backend/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../../../../models/subDomain/backend/*/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../../../../models/subDomain/backend/*/*/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../../../../models/subDomain/backend/*/*/*/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../../../../models/subDomain/backend/*/*/*/*/*/*.model.ts`),
  ];

  let dbModels = dbResolvers.map(dbFilePath => {
    return require(dbFilePath).default
  })

  const emptyTestDb = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
      host: config.HOST,
      dialect: "postgres",
      // operatorsAliases: false,

      pool: {
        max: config.pool.max,
        min: config.pool.min,
        // acquire: config.pool.acquire,
        idle: config.pool.idle
      }
    }
  );
  emptyTestDb.addModels(dbModels);

  // migration file implementation for basic database.
  const umzug = new Umzug({
    migrations: { glob: 'app/models/subDomain/migrations/*.js' },
    context: emptyTestDb.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: emptyTestDb }),
    logger: console,
  });

  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  await umzug.up();

  // Seeder files
  //https://stackoverflow.com/questions/71730361/how-to-programatically-run-sequelize-seeders

  var seeder = new Umzug({
    migrations: { glob: 'app/models/subDomain/seeders/emptyDb/*.js' },
    context: emptyTestDb.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: emptyTestDb, modelName: 'SequelizeData' }),
    logger: console,
  });

  await seeder.up()

  subDomainDb = emptyTestDb;
  return subDomainDb
}