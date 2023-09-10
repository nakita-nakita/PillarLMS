import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendPermission from '../permission/backendPermission.model';
import backendUser from './backendUser.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendUserManyPermission",
})
export default class backendUserManyPermission extends Model {
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

  @ForeignKey(() => backendPermission)
  @Column({
    allowNull: false
  })
  permissionId: string;
}
