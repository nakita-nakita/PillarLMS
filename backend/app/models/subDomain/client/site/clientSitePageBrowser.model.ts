import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import clientSitePage from './clientSitePage.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "clientSitePageBrowser",
})
export default class clientSitePageBrowser extends Model {

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

  @ForeignKey(() => clientSitePage)
  @Column({
    allowNull: false
  })
  pageId: string;
}
