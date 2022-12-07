import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  DataTypes
} from 'sequelize';
import { sequelize } from '..';
import { GameType } from './GameType';

class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
  declare id: CreationOptional<number>;
  declare gameType: ForeignKey<GameType['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    gameType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },

  {
    tableName: 'games',
    sequelize
  }
);

GameType.hasOne(Game, {
  sourceKey: 'id',
  foreignKey: 'gameType'
});
export { Game };
