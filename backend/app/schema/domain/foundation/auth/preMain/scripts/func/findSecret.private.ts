const findSecret = process.env.APP_SECRET || Math.random()

export default findSecret.toString();