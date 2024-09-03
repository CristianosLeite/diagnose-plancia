import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database-config';

class Activity extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public duration!: number;
  public date!: Date;
  public location!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Activity.init(
  {
    activityId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    point: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activityType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sop: {
      type: DataTypes.STRING,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dayToCheck: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    lastChecked: {
      type: DataTypes.DATE,
    },
    estimatedTime: {
      type: 'INTERVAL',
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Activity',
    createdAt: true,
    updatedAt: true,
  },
);

export default Activity;
