export default {
  mongoUrl: global.__MONGO_URI__ ?? 'config_prod',
  port: process.env.PORT ?? 5050
}
