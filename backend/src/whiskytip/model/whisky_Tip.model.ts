
import { AllowNull, BelongsTo, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { whiskyTipComment } from './whisky_Tip_Comment.model';
// 유저 모델 들고와야함 foreignKey nick가져오기

//테이블 속성
@Table({
  tableName: "whiskyTip", // 테이블의 이름
  timestamps: true, // 생성 수정 시간 표기
  paranoid: true // 삭제 시간 표기
})

// 중현이거 들고오면 belongs to 하기
export class whiskyTip extends Model {

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  nick_name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  category: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  tip_title: string;

  // tip_ID: string 

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  tip_content: string;

  @Column({
    type: DataType.STRING(255)
  })
  img: string;

  @HasMany(() => whiskyTipComment, {
    sourceKey: 'id',
    foreignKey: 'tip_ID',  // whiskyTipComment 모델에서 참조하는 외래 키
  })
  whisky: whiskyTipComment[];

}