const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Spaceship = require("./spaceship");
const Scoredata = require("./scoredata");
const Shipdata = require("./shipdata");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  { timezone: "+09:00" }
);

db.sequelize = sequelize;
db.User = User;
db.Spaceship = Spaceship;
db.Scoredata = Scoredata;
db.Shipdata = Shipdata;

User.init(sequelize);
Spaceship.init(sequelize);
Scoredata.init(sequelize);
Shipdata.init(sequelize);

User.associate(db);
Spaceship.associate(db);
Scoredata.associate(db);
Shipdata.associate(db);

module.exports = db;
