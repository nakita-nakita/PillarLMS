import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import clientSitePage from './clientSitePage.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "clientSitePageLink",
})
export default class clientSitePageLink extends Model {

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

  @ForeignKey(() => clientSitePage)
  @Column({
    allowNull: false
  })
  pageId: string;
}
