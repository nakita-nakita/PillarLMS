import { Sequelize } from "sequelize-typescript"
import { Umzug, SequelizeStorage } from "umzug"
import glob from "glob"

let domainDb;

const config = {
  HOST: process.env.POSTGRES_DOMAIN_HOST,
  USER: process.env.POSTGRES_DOMAIN_USER,
  PASSWORD: process.env.POSTGRES_DOMAIN_PASSWORD,
  DB: process.env.POSTGRES_DOMAIN_DB,
  dialect: "postgres",
  pool: {
    max: parseInt(process.env.POSTGRES_DOMAIN_POOL_MAX),
    min: parseInt(process.env.POSTGRES_DOMAIN_POOL_MIN),
    // acquire: parseInt(process.env.POSTGRES_POOL_ACQUIRE),
    idle: parseInt(process.env.POSTGRES_DOMAIN_POOL_IDLE)
  }
}

const handleExit = () => {
  if (domainDb) {
    // Close the Sequelize connection before exiting
    domainDb.close()
      .then(() => {
        console.log("Sequelize connection closed.");
        process.exit(0); // Exit the application
      })
      .catch((err) => {
        console.error("Error while closing Sequelize connection:", err);
        process.exit(1); // Exit with an error code
      });
  } else {
    process.exit(0); // Exit the application if there's no database connection
  }
};

// Listen for the 'SIGINT' signal to gracefully exit
process.on("SIGINT", handleExit);

export default async function connectToDomainDb(): Promise<Sequelize> {

  if (domainDb) {
    return domainDb
  }

  // Grad all files to build database
  let dbResolvers = [
    ...glob.sync(`${__dirname}/../../../../models/domain/*/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../../../../models/domain/*/*/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../../../../models/domain/*/*/*/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../../../../models/domain/*/*/*/*/*/*.model.ts`),
    ...glob.sync(`${__dirname}/../../../../models/domain/*/*/*/*/*/*/*.model.ts`),
  ];

  let dbModels = dbResolvers.map(dbFilePath => {
    return require(dbFilePath).default
  })

  const db = new Sequelize(
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
      },
      logging: false, // Disable Sequelize's logging to the console
    }
  );
  db.addModels(dbModels);

  // migration file implementation for basic database.
  const umzug = new Umzug({
    migrations: { glob: 'app/models/domain/migrations/*.js' },
    context: db.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: db }),
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
    context: db.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: db, modelName: 'SequelizeData' }),
    logger: console,
  });

  await seeder.up()

  domainDb = db;
  return domainDb
}