// import sequelize, { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendMediaManagerFolder from './backendMediaManagerFolder.model';
import backendUser from '../user/backendUser.model';
// import Sequelize from 'sequelize';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendMediaManagerFile",
})
export default class backendMediaManagerFile extends Model {
  
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
  userFileName: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  systemFileName: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  url: string;

  @ForeignKey(() => backendMediaManagerFolder)
  @Column
  folderId: string;

  @ForeignKey(() => backendUser)
  @Column({
    type: DataType.STRING,
  })
  deletedBy: string;
  
  @ForeignKey(() => backendUser)
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  uploadedBy: string;
}