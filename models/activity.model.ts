import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database-config';

class Activity extends Model {
  activity_id!: number;
}

Activity.init(
  {
    activity_id: {
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
    activity_type: {
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
    day_to_check: {
      type: DataTypes.STRING,
    },
    action_plan: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    last_checked: {
      type: DataTypes.DATE,
    },
    estimated_time: {
      type: 'INTERVAL',
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Activity',
    tableName: 'activities',
    createdAt: true,
    updatedAt: true,
  },
);

export default Activity;
