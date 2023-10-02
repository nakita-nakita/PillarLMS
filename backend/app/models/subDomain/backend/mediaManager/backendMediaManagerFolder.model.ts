// import sequelize, { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendUser from '../user/backendUser.model';
// import Sequelize from 'sequelize';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendMediaManagerFolder",
})
export default class backendMediaManagerFolder extends Model {
  
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
  
  @Column({
    type: DataType.STRING,
  })
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
  createdBy: string;
}
