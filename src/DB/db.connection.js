import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("hti_sequelize", "root", "root", {
  port: 3306,
  host: "localhost",
  dialect: "mysql",
});

export async function testDBConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
export async function DBSync({ alter = false, force = false }) {
  try {
    await sequelize.sync({ alter, force });
    console.log("Connection has been sync successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
