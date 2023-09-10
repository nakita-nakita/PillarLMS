import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSiteDesignerSetting",
})
export default class backendSiteDesignerSetting extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: sequelize.BOOLEAN,
    allowNull: false,
  })
  canAllRead: boolean;

  @Column({
    type: sequelize.BOOLEAN,
    allowNull: false,
  })
  canAllUpdate: boolean;
}
