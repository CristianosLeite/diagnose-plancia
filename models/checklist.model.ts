import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database-config';
import User from './user.model';
import Activity from './activity.model';

class Checklist extends Model {
  public id!: number;
  public activityId!: number;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Checklist.init(
  {
    checklistId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Checklist',
    createdAt: true,
    updatedAt: true,
  },
);

User.hasMany(Checklist, {
  foreignKey: 'userId',
  as: 'checklists',
});

Checklist.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Activity.hasMany(Checklist, {
  foreignKey: 'activityId',
  as: 'checklists',
});

Checklist.belongsTo(Activity, {
  foreignKey: 'activityId',
  as: 'activity',
});

export default Checklist;
