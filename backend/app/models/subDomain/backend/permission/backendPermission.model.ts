// import sequelize, { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';
// import Sequelize from 'sequelize';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendPermission",
})
export default class backendPermission extends Model {
  
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;
}
