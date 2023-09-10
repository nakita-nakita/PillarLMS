import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendUser from '../../user/backendUser.model';
import backendSiteDesigner_discussion from './backendSiteDesigner_discussion.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSiteDesigner_discussionVote",
})
export default class backendSiteDesigner_discussionVote extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: sequelize.SMALLINT,
    allowNull: false,
  })
  vote: number;

  @ForeignKey(() => backendUser)
  @Column({
    allowNull: false
  })
  userId: string;


  @ForeignKey(() => backendSiteDesigner_discussion)
  @Column({
    allowNull: false
  })
  discussionId: string;
}
