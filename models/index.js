const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const User = require("./user");
const Spaceship = require("./spaceship");
const Score = require("./score");
const Domain = require("./domain");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Spaceship = Spaceship;
db.Score = Score;
db.Domain = Domain;

User.init(sequelize);
Spaceship.init(sequelize);
Score.init(sequelize);
Domain.init(sequelize);

User.associate(db);
Spaceship.associate(db);
Score.associate(db);
Domain.associate(db);

module.exports = db;
