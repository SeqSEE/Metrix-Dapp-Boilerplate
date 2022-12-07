import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  DataTypes
} from 'sequelize';
import { sequelize } from '..';
import { Game } from './Game';

class Account extends Model<
  InferAttributes<Account>,
  InferCreationAttributes<Account>
> {
  declare id: CreationOptional<number>;
  declare bsc: string | null;
  declare eth: string | null;
  declare mrx: string | null;
  declare discord: string | null;
  declare game: ForeignKey<Game['id']> | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    bsc: {
      type: new DataTypes.STRING(40),
      allowNull: true,
      unique: true,
      validate: {
        is: /[a-fA-F0-9]{40}$/
      }
    },
    eth: {
      type: new DataTypes.STRING(40),
      allowNull: true,
      unique: true,
      validate: {
        is: /^[a-fA-F0-9]{40,40}$/
      }
    },
    mrx: {
      type: new DataTypes.STRING(40),
      allowNull: true,
      unique: true,
      validate: {
        is: /^[a-fA-F0-9]{40,40}$/
      }
    },
    discord: {
      type: new DataTypes.STRING(40),
      allowNull: true,
      unique: true,
      validate: {
        is: /^[0-9]{17,18}$/
      }
    },
    game: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'accounts',
    sequelize
  }
);

Game.hasMany(Account, {
  sourceKey: 'id',
  foreignKey: 'game'
});

export { Account };
