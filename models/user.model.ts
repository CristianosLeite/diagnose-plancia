import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database-config';
import Activity from './activity.model';

class User extends Model { }

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    badge_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    plant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: true,
    updatedAt: true,
  },
);

User.hasMany(Activity, {
  foreignKey: 'user_id',
  as: 'activities',
});

Activity.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

export default User;
