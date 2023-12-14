import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

export enum LoudSectionEnum {
  HOMEPAGE = "HOMEPAGE",
  NORMALPAGE = "NORMALPAGE",
}

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSiteDesignerPageSectionLoudBuiltIn",
})
export default class backendSiteDesignerPageSectionLoudBuiltIn extends Model {

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
    type: sequelize.ENUM("HOMEPAGE", "NORMALPAGE"),
  })
  category: LoudSectionEnum;

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
