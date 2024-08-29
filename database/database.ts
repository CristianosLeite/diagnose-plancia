import { sequelize } from "./database-config";
import User from "../models/user.model";
import Activity from "../models/activity.model";
import Checklist from "../models/checklist.model";

export async function connect() {
  await sequelize.authenticate()
    .then(async () => {
      console.log('Connection has been established successfully.');

      // Create User table
      await User.sync({ alter: true })
        .then(() => {
          console.log('User table has been created successfully.');
        })
        .catch((error) => {
          console.error('Unable to create User table  :', error);
        });

        // Create Activity table
        await Activity.sync({ alter: true })
        .then(() => {
          console.log('Activity table has been created successfully.');
        })
        .catch((error) => {
          console.error('Unable to create Activity table  :', error);
        });

        // Create Checklist table
        await Checklist.sync({ alter: true })
        .then(() => {
          console.log('Checklist table has been created successfully.');
        })
        .catch((error) => {
          console.error('Unable to create Checklist table  :', error);
        });
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });
}

export async function createTables() {
  await sequelize.sync({ alter: true })
    .then(() => {
      console.log('Tables have been created successfully.');
    })
    .catch((error) => {
      console.error('Unable to create tables:', error);
    });
}
