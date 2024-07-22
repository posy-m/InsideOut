import { HasMany, BelongsTo, Column, DataType, ForeignKey, Model, Table, AllowNull, HasOne } from 'sequelize-typescript';
import { whiskyTipComment } from './whisky_Tip_Comment.model';
// 유저 모델 들고와야함 foreignKey nick가져오기

@Table({
  tableName: "whiskyTipCcomment", // 테이블의 이름
  timestamps: true, // 생성 수정 시간 표기
  paranoid: true // 삭제 시간 표기
})

export class whiskyTipCcomment extends Model {
  @ForeignKey(() => whiskyTipComment)
  @Column
  tip_comment_ID: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  nick_name: string;

  @Column({
    type: DataType.STRING(255)
  })
  tip_com_comment: string;

  @BelongsTo(() => whiskyTipComment)
  whiskyTipComment: whiskyTipComment;
}