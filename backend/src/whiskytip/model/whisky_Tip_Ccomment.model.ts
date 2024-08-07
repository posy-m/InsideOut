import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserSignUp } from 'src/login/model/login.model';
import { whiskyTipComment } from './whisky_Tip_Comment.model';

@Table({
  tableName: "whiskyTipCcomment",
  timestamps: true,
  paranoid: true
})
export class whiskyTipCcomment extends Model {
  @Column({
    type: DataType.INTEGER
  })
  category: number;

  @ForeignKey(() => whiskyTipComment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  tip_comment_ID: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  nick_name: string;

  @Column({
    type: DataType.TEXT
  })
  tip_com_comment: string;

  @BelongsTo(() => whiskyTipComment, {
    targetKey: 'id',
    foreignKey: 'tip_comment_ID'
  })
  whiskyTipComment: whiskyTipComment;

  @BelongsTo(() => UserSignUp, {
    foreignKey: 'nick_name',
    targetKey: 'nick_name'
  })
  user: UserSignUp;
}
