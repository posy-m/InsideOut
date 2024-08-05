import { HasMany, BelongsTo, Column, DataType, ForeignKey, Model, Table, AllowNull, HasOne } from 'sequelize-typescript';
import { whiskyTip } from './whisky_Tip.model'
import { whiskyTipCcomment } from './whisky_Tip_Ccomment.model';
// 유저 모델 들고와야함 foreignKey nick가져오기



@Table({
  tableName: "whiskyTipComment", // 테이블의 이름
  timestamps: true, // 생성 수정 시간 표기
  paranoid: true // 삭제 시간 표기
})

export class whiskyTipComment extends Model {

  @Column
  category: number;

  @ForeignKey(() => whiskyTip)
  @Column
  tip_ID: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  nick_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  tip_comment: string;

  @BelongsTo(() => whiskyTip, {
    targetKey: 'id',
    foreignKey: 'tip_ID'
  })
  whiskyTip: whiskyTip

  @HasMany(() => whiskyTipCcomment, {
    sourceKey: 'id',
    foreignKey: 'tip_comment_ID',
  })
  whiskyTipCcomment: whiskyTipCcomment[];

}