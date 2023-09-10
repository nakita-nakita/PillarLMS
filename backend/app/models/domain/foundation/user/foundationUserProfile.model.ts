// import sequelize, { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
// import Sequelize from 'sequelize';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "foundationUserProfile",
})
export default class foundationUserProfile extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })

  lastName: string;
  @Column({
    type: DataType.STRING,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  picture: string;

  @Column({
    type: DataType.STRING,
  })
  callByType: string;

  @Column({
    type: DataType.STRING,
  })
  circleColor: string;

  @Column({
    type: DataType.STRING,
  })
  labelColor: string;
}
