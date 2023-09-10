// import sequelize, { DataTypes } from 'sequelize';
import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendUser from '../user/backendUser.model';
// import Sequelize from 'sequelize';

export enum BackendNotificationEnum {
  SYSTEM = "SYSTEM",
  DISCUSSION = "DISCUSSION",
}

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendNotification",
})
export default class backendNotification extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: sequelize.ENUM("SYSTEM", "DISCUSSION"),
    allowNull: false,
  })
  type: BackendNotificationEnum;

  @Column({
    type: sequelize.STRING,
    allowNull: false,
  })
  message: string;

  @Column({
    type: sequelize.STRING,
  })
  locationMessage: string;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  hasBeenSeen: boolean;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  hasBeenClicked: boolean;

  @Column({
    type: sequelize.STRING,
    allowNull: false,
  })
  url: boolean;

  @ForeignKey(() => backendUser)
  @Column({
    allowNull: false
  })
  userId: string;

}
