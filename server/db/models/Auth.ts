import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
  CreationOptional,
  DataTypes
} from 'sequelize';
import { sequelize } from '..';
import { Account } from './Account';

class Auth extends Model<InferAttributes<Auth>, InferCreationAttributes<Auth>> {
  declare id: CreationOptional<number>;
  declare account: ForeignKey<Account['id']>;
  declare nonce: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Auth.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    account: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    nonce: {
      type: new DataTypes.STRING(256),
      allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'auth',
    sequelize
  }
);

Account.hasOne(Auth, {
  sourceKey: 'id',
  foreignKey: 'account'
});

export { Auth };
