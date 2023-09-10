// import sequelize, { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendPermission from '../permission/backendPermission.model';
import backendRole from './backendRole.model';
// import Sequelize from 'sequelize';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendRoleManyPermission",
})
export default class backendRoleManyPermission extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;


  @ForeignKey(() => backendRole)
  @Column
  roleId: string;

  @ForeignKey(() => backendPermission)
  @Column
  permissionId: string;
}
