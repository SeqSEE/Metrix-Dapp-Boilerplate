import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey
} from 'sequelize';
import { sequelize } from '..';
import { Account } from './Account';
import { GameType } from './GameType';

class GameStat extends Model<
  InferAttributes<GameStat>,
  InferCreationAttributes<GameStat>
> {
  declare id: CreationOptional<number>;
  declare account: ForeignKey<Account['id']>;
  declare gameType: ForeignKey<GameType['id']>;
  declare wins: number;
  declare total: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

GameStat.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    account: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gameType: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    wins: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    total: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'stats',
    sequelize
  }
);

Account.hasMany(GameStat, {
  sourceKey: 'id',
  foreignKey: 'account'
});

GameType.hasMany(GameStat, {
  sourceKey: 'id',
  foreignKey: 'gameType'
});

export { GameStat };
