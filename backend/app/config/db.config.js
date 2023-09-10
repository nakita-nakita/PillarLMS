module.exports = {
  HOST: process.env.POSTGRES_HOST,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  MAIN_DB: process.env.POSTGRES_MAIN_DB,
  SUB_DB: process.env.POSTGRES_SUB_DB,
  dialect: "postgres",
  pool: {
    max: parseInt(process.env.POSTGRES_POOL_MAX),
    min: parseInt(process.env.POSTGRES_POOL_MIN),
    // acquire: parseInt(process.env.POSTGRES_POOL_ACQUIRE),
    idle: parseInt(process.env.POSTGRES_POOL_IDLE)
  }
};