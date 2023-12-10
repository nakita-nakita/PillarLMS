import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendSiteDesignerPage from './backendSiteDesignerPage.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSiteDesignerPageBrowser",
})
export default class backendSiteDesignerPageBrowser extends Model {

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
  tabName: string;

  @ForeignKey(() => backendSiteDesignerPage)
  @Column({
    allowNull: false
  })
  pageId: string;
}
