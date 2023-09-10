import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSiteDesigner_page",
})
export default class backendSiteDesigner_page extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: sequelize.STRING,
    allowNull: false,
  })
  nickname: string;

  @Column({
    type: sequelize.STRING,
    allowNull: false,
  })
  version: string;

  @Column({
    type: sequelize.BOOLEAN,
    defaultValue: false,
  })
  isReady: boolean;

  @Column({
    type: sequelize.JSONB,
    allowNull: false,
  })
  data: JSON;

}
