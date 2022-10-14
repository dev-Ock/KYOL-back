const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Spaceship = require("./spaceship");
const Scoredata = require("./scoredata");
const Domain = require("./domain");

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
db.Domain = Domain;

User.init(sequelize);
Spaceship.init(sequelize);
Scoredata.init(sequelize);
Domain.init(sequelize);

User.associate(db);
Spaceship.associate(db);
Scoredata.associate(db);
Domain.associate(db);

module.exports = db;
