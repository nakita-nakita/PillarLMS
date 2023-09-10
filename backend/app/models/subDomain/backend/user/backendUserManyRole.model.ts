// import sequelize, { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendRole from '../role/backendRole.model';
import backendUser from './backendUser.model';
// import Sequelize from 'sequelize';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendUserManyRole",
})
export default class backendUserManyRole extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => backendUser)
  @Column({
    allowNull: false
  })
  userId: string;

  @ForeignKey(() => backendRole)
  @Column({
    allowNull: false
  })
  roleId: string;
}
