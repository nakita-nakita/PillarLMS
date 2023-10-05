import sequelize from 'sequelize';
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import backendUser from '../../user/backendUser.model';
import backendSiteDesignerDiscussionComment from './backendSiteDesignerDiscussionComment.model';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "backendSiteDesignerDiscussionCommentVote",
})
export default class backendSiteDesignerDiscussionCommentVote extends Model {

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


  @ForeignKey(() => backendSiteDesignerDiscussionComment)
  @Column({
    allowNull: false
  })
  commentId: string;
}
