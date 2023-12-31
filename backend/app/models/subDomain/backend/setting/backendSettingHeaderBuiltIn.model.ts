import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSettingHeaderBuiltIn",
})
export default class backendSettingHeaderBuiltIn extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  // GUI
  @Column({
    type: sequelize.STRING,
  })
  webAssetImport: string;

  @Column({
    type: sequelize.JSONB,
  })
  menuJsonB: string;

  //meta
  @Column({
    type: sequelize.STRING,
  })
  description: string;

  @Column({
    type: sequelize.STRING,
  })
  author: string;

  @Column({
    type: sequelize.STRING,
  })
  authorLink: string;

  // location
  @Column({
    type: sequelize.STRING,
  })
  name: string;

}
