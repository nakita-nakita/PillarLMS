import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendSiteDesignerPage from './backendSiteDesignerPage.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSiteDesignerPageLink",
})
export default class backendSiteDesignerPageLink extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: sequelize.STRING,
  })
  title: string;

  @Column({
    type: sequelize.STRING,
  })
  description: string;

  @Column({
    type: sequelize.STRING,
  })
  picture: string;

  @Column({
    type: sequelize.STRING,
  })
  pictureAlt: string;

  @ForeignKey(() => backendSiteDesignerPage)
  @Column({
    allowNull: false
  })
  pageId: string;
}
