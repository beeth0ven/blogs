const config = {
  hostname: process.env.MONGO_HOSTNAME || 'luojiedeMac-Mini.local',
  port: process.env.MONGO_PORT || 27017,
  env: process.env.MONGO_ENV || 'local'
};

const getDBUser = () => {
  if (process.env.MONGO_USER && process.env.MONGO_PASS) {
    return {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS
    }
  }
  return null
};

export { config, getDBUser } ;