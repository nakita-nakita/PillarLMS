import sequelize from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "foundationSetting_email",
})
export default class foundationSetting_email extends Model {

  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: sequelize.STRING,
    defaultValue: "Please verify your email address on Hackathon Starter",
  })
  emailVerificationSubject: string;

  @Column({
    type: sequelize.STRING,
    defaultValue: `Thank you for registering with hackathon-starter.\n\nThis verify your email address please click on the following link, or paste this into your browser:\n\nhttp://{{host}}/account/verify/{{token}}\n\nThank you`,
  })
  emailVerificationMessage: string;

  @Column({
    type: sequelize.STRING,
    defaultValue: "Reset your password on Hackathon Starter",
  })
  passwordResetSubject: string;

  @Column({
    type: sequelize.STRING,
    defaultValue: "Reset your password on Hackathon Starter",
  })
  passwordResetMessage: string;

  //Approved user Password
  @Column({
    type: sequelize.STRING,
    defaultValue: "Reset your password on Hackathon Starter",
  })
  resetPasswordEmailSubject: string;

  @Column({
    type: sequelize.STRING,
    defaultValue: "You are receiving this email because your request to become a user has been approved. Please confirm below.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n{{host}}/reset/{{token}}\n\n",
  })
  resetPasswordEmailMessage: string;

  @Column({
    type: sequelize.STRING,
    defaultValue: "User Request Approved",
  })
  inviteUserSubject: string;

  @Column({
    type: sequelize.STRING,
    defaultValue: "You are receiving this email because you have been invited to become a user by an admin. Please confirm below.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n{{host}}/reset/{{token}}\n\n",
  })
  inviteUserMessage: string;

}
