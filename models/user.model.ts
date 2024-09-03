import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/database-config';
import Activity from './activity.model';

class User extends Model {
  public id!: string;
  public name!: string;
  public origin!: string;
  public company!: string;
  public badgeNumber!: number;
  public plant!: string;
  public skills!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    userId: {
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
    badgeNumber: {
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
    createdAt: true,
    updatedAt: true,
  },
);

User.hasMany(Activity, {
  foreignKey: 'userId',
  as: 'activities',
});

Activity.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export default User;
