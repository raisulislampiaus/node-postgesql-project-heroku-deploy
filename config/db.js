const { Sequelize, DataTypes } = require("sequelize");
const CONNECTION_STRING =
  process.env.DATABASE_URL || "postgres://qjtqfacphvkciw:fc7e00871ec808fadfa5231499b29e58ae9eb88910fb0dc82750b9c27dc93a12@ec2-3-225-110-188.compute-1.amazonaws.com:5432/d4d0fbv5s704pe";
const sequelize = new Sequelize(CONNECTION_STRING);


sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("../models/productModel")(sequelize, DataTypes);
db.reviews = require("../models/reviewModel")(sequelize, DataTypes);
db.users = require("../models/userModel")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

db.products.hasMany(db.reviews, {
  foreignKey: "product_id",
  as: "review",
});

db.reviews.belongsTo(db.products, {
  foreignKey: "product_id",
  as: "product",
});

module.exports = db;
