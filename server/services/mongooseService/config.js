const config = {
  hostname: process.env.MONGO_HOSTNAME || 'luojiedeMac-Mini.local',
  port: process.env.MONGO_PORT || 27017,
  env: process.env.MONGO_ENV || 'local'
};

export default config;