import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes
} from 'sequelize';
import { sequelize } from '..';

class GameType extends Model<
  InferAttributes<GameType>,
  InferCreationAttributes<GameType>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

GameType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(64)
    }
  },

  {
    tableName: 'gametype',
    timestamps: false,
    sequelize
  }
);

export { GameType };
