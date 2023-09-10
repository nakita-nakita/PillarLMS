import { Sequelize } from "sequelize-typescript"
import { Umzug, SequelizeStorage } from "umzug"
import glob from "glob"

let domainDb;

const config = {
  HOST: process.env.POSTGRES_HOST,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DB: process.env.POSTGRES_DOMAIN_DB,
  dialect: "postgres",
  pool: {
    max: parseInt(process.env.POSTGRES_POOL_MAX),
    min: parseInt(process.env.POSTGRES_POOL_MIN),
    acquire: parseInt(process.env.POSTGRES_POOL_ACQUIRE),
    idle: parseInt(process.env.POSTGRES_POOL_IDLE)
  }
}

export default async function emptyTestDomainDb(): Promise<Sequelize> {
  // option?: { newDb?: boolean }


  if (domainDb) {
    return domainDb
  }

  // Grad all files to build database
  let dbResolvers = [
    ...glob.sync(`${__dirname}/../foundation/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../foundation/*/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../foundation/*/*/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../foundation/*/*/*/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../foundation/*/*/*/*/*/*.model.ts`),
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
        acquire: config.pool.acquire,
        idle: config.pool.idle
      }
    }
  );
  emptyTestDb.addModels(dbModels);

  // migration file implementation for basic database.
  const umzug = new Umzug({
    migrations: { glob: 'app/models/domain/migrations/*.js' },
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
    migrations: { glob: 'app/models/domain/seeders/emptyDb/*.js' },
    context: emptyTestDb.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: emptyTestDb, modelName: 'SequelizeData' }),
    logger: console,
  });

  await seeder.up()

  domainDb = emptyTestDb;
  return domainDb
}