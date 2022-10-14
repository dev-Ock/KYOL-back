const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Spaceship = require("./spaceship");
const Scoredata = require("./scoredata");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  // { timezone: "Asia/Seoul" }
  { timezone: "+09:00" }
);

db.sequelize = sequelize;
db.User = User;
db.Spaceship = Spaceship;
db.Scoredata = Scoredata;

User.init(sequelize);
Spaceship.init(sequelize);
Scoredata.init(sequelize);

User.associate(db);
Spaceship.associate(db);
Scoredata.associate(db);

module.exports = db;
